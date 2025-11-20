'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllCategoriesAdminQuery } from '@/redux/store/api/category/categoryApi';
import { useGetAllMaterialsQuery } from '@/redux/store/api/material/materialApi';
import { useGetAllFabricsQuery } from '@/redux/store/api/fabric/fabricApi';
import { useCreateProductMutation } from '@/redux/store/api/product/productApi';
import { toast } from 'sonner';
import { Category } from '@/types/category.types';
import { Material } from '@/types/material.types';
import { Fabric } from '@/types/fabric.types';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/components/ReusableUI/FormWrapper';
import FormInput from '@/components/ReusableUI/FormInput';
import { useFormContext } from 'react-hook-form';
import { FormCheckboxGroup } from '@/components/ReusableUI/FormCheckboxGroup';
import CategorySizesUpdater from '../_component/CategorySizesUpdater';
import SizesCheckboxes from '../_component/SizesCheckboxes';
import { VariantsSection } from '../_component/VariantsSection';
import AddVariantButton from '../_component/AddVariantButton';
import { PublishedSwitch } from '../_component/PublishedSwitch';
import { VariantForForm } from '@/types/product.types';
import { uploadToCloudinary } from '@/lib/helper/uploadToCloudinary';
import { useGetAllCollectionsAdminQuery } from '@/redux/store/api/collection/collectionApi';
import { Collection } from '@/types/collection.types';
import { color } from 'framer-motion';

interface FormValues {
  name: string;
  description: string;
  brand: string;
  gender: 'MEN' | 'WOMEN' | 'UNISEX' | 'BOYS' | 'GIRLS';

  fitType?: 'SLIM' | 'REGULAR' | 'RELAXED' | 'OVERSIZED' | 'TAILORED';
  pattern?: string;
  neckline?: string;
  sleeveType?: string;
  occasion?: string; // comma-based input → backend array
  careInstructions?: string;
  madeIn?: string;
  sustainable?: boolean;

  tags: string;
  categoryId: string;
  materialIds: string[];
  fabricIds: string[];
  published: boolean;
  variants: VariantForForm[];
  primaryImage: File[];
  otherImages: File[];
  videoUrl?: string;
  supplier: string;
}

const AddProductPage = () => {
  const router = useRouter();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [createProduct] = useCreateProductMutation();
  const { data: categoriesData } = useGetAllCategoriesAdminQuery();
  const { data: collectionsData } = useGetAllCollectionsAdminQuery();
  const { data: materialsData } = useGetAllMaterialsQuery({});
  const { data: fabricsData } = useGetAllFabricsQuery({});

  const categories: Category[] = categoriesData?.data?.data || [];
  const collections: Collection[] = collectionsData?.data?.data || [];
  const materials: Material[] = materialsData?.data?.data || [];
  const fabrics: Fabric[] = fabricsData?.data?.data || [];

  const defaultValues: FormValues = {
    name: '',
    description: '',
    brand: '',
    gender: 'MEN',

    fitType: 'REGULAR',
    pattern: '',
    neckline: '',
    sleeveType: '',
    occasion: '',
    careInstructions: '',
    madeIn: '',

    tags: '',
    categoryId: '',
    materialIds: [],
    fabricIds: [],
    published: true,
    variants: [{ size: '', price: 0, costPrice: 0, stock: 0, sku: '', color: '#000000' }],
    primaryImage: [],
    otherImages: [],
    videoUrl: '',
    supplier: '',
  };

  const handleSubmit = async (values: FormValues) => {
    if (values.primaryImage.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }
    if (values.variants.length === 0) {
      toast.error('Please add at least one variant.');
      return;
    }

    try {
      // 🧠 Upload primary image first
      const primaryFile = Array.isArray(values.primaryImage)
        ? values.primaryImage[0]
        : values.primaryImage;

      const primaryImageFile =
        primaryFile instanceof FileList ? primaryFile[0] : primaryFile;

      const primaryImageUrl = await uploadToCloudinary(
        primaryImageFile,
        'khushbuwaala_images/products'
      );

      // 🧠 Upload other images next
      const otherFiles = Array.isArray(values.otherImages)
        ? values.otherImages
        : [values.otherImages];

      const otherImageUrls = await Promise.all(
        otherFiles.flatMap(fileList =>
          Array.from(fileList instanceof FileList ? fileList : [fileList])
        ).map(file => uploadToCloudinary(file, 'khushbuwaala_images/products'))
      );

      // Upload Variant Images
      const uploadedVariants = await Promise.all(
        values.variants.map(async (v) => {
          const variantImageUrls = [];

          if (v.images && v.images.length > 0) {
            for (const file of v.images) {
              const uploadedUrl = await uploadToCloudinary(
                file,
                "khushbuwaala_images/variants"
              );
              variantImageUrls.push(uploadedUrl);
            }
          }

          return {
            ...v,
            images: variantImageUrls,
            price: Number(v.price),
            costPrice: Number(v.costPrice),
            stock: Number(v.stock),
          };
        })
      );
      const payload = {
        ...values,
        primaryImage: primaryImageUrl,
        otherImages: otherImageUrls,
        tags: values.tags.split(',').map(t => t.trim()).filter(Boolean),
        occasion: values.occasion?.split(',').map(b => b.trim()).filter(Boolean),
        variants: uploadedVariants,  // <-- HERE
      };

      await createProduct(payload).unwrap();
      toast.success('Product added successfully!');
      setImagePreviews([]);
      // router.push('/dashboard/products');
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Product creation failed.');
      return false;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <FormWrapper
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitButtonText="Add Product"
            submitButtonClassName="bg-[#FB923C] hover:bg-[#ff8a29]"
            errorMessage='Failed to add product. Please try again.'
            resetButtonText="Cancel"
            resetButtonClassName="border-[#FB923C] text-[#FB923C]"
            resetOnSuccess={true}
          >
            {/* Category Sizes */}
            <CategorySizesUpdater categories={categories} setSelectedSizes={setSelectedSizes} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput name="name" label="Name" placeholder="Product Name" inputClassName="border-[#FB923C]" />
              <FormInput
                name="categoryId"
                label="Category"
                type="select"
                options={categories.map(cat => ({ value: cat.id, label: cat.categoryName }))}
                inputClassName="border-[#FB923C]"
              />
              <FormInput
                name="collectionId"
                label="Collection"
                type="select"
                options={collections.map(col => ({ value: col.id, label: col.collectionName }))}
                inputClassName="border-[#FB923C]"
              />
              <FormCheckboxGroup
                name="fabricIds"
                label="Fabric"
                options={fabrics.map(f => ({ label: f.fabricName, value: f.id }))}
              />
              <FormCheckboxGroup
                name="materialIds"
                label="Materials"
                options={materials.map(m => ({ label: m.materialName, value: m.id }))}
              />
              <FormInput name="brand" label="Brand" placeholder="Brand" inputClassName="border-[#FB923C]" />
              <FormInput
                name="gender"
                label="Gender"
                type="select"
                options={[
                  { value: 'MEN', label: 'Men' },
                  { value: 'WOMEN', label: 'Women' },
                  { value: 'UNISEX', label: 'Unisex' },
                  { value: 'BOYS', label: 'Boys' },
                  { value: 'GIRLS', label: 'Girls' },
                ]}
                inputClassName="border-[#FB923C]"
              />
              {/* --- Apparel Specification Fields --- */}
              <FormInput
                name="fitType"
                label="Fit Type"
                type="select"
                options={[
                  { value: 'SLIM', label: 'Slim' },
                  { value: 'REGULAR', label: 'Regular' },
                  { value: 'RELAXED', label: 'Relaxed' },
                  { value: 'OVERSIZED', label: 'Oversized' },
                  { value: 'TAILORED', label: 'Tailored' },
                ]}
                inputClassName="border-[#FB923C]"
              />

              <FormInput
                name="pattern"
                label="Pattern"
                type="select"
                options={[
                  { value: 'Solid', label: 'Solid' },
                  { value: 'Striped', label: 'Striped' },
                  { value: 'Checked', label: 'Checked' },
                  { value: 'Printed', label: 'Printed' },
                  { value: 'Floral', label: 'Floral' },
                ]}
                inputClassName="border-[#FB923C]"
              />

              <FormInput
                name="neckline"
                label="Neckline"
                type="select"
                options={[
                  { value: 'Round', label: 'Round' },
                  { value: 'V-neck', label: 'V-neck' },
                  { value: 'Collar', label: 'Collar' },
                  { value: 'Hooded', label: 'Hooded' },
                ]}
                inputClassName="border-[#FB923C]"
              />

              <FormInput
                name="sleeveType"
                label="Sleeve Type"
                type="select"
                options={[
                  { value: 'Sleeveless', label: 'Sleeveless' },
                  { value: 'Half Sleeve', label: 'Half Sleeve' },
                  { value: 'Full Sleeve', label: 'Full Sleeve' },
                ]}
                inputClassName="border-[#FB923C]"
              />

              <FormInput
                name="occasion"
                label="Occasion (comma separated)"
                placeholder="Casual, Formal, Party"
                inputClassName="border-[#FB923C]"
              />

              <FormInput
                name="careInstructions"
                label="Care Instructions"
                type="textarea"
                placeholder="Machine wash, Do not bleach"
                inputClassName="border-[#FB923C]"
              />

              <FormInput
                name="madeIn"
                label="Made In"
                placeholder="Bangladesh, China, Italy"
                inputClassName="border-[#FB923C]"
              />

              {/* <FormInput
  name="sustainable"
  label="Sustainable Product?"
  type="checkbox"
  inputClassName="border-[#FB923C]"
/> */}

              <FormInput name="tags" label="Tags" placeholder="" inputClassName="border-[#FB923C]" />
            </div>

            <FormInput name="description" label="Description" type="textarea" placeholder="Product Description" inputClassName="border-[#FB923C]" />

            {/* Product Images */}
            <Card className="border-[#FB923C]">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Primary Image */}
                <div>
                  <FormInput
                    name="primaryImage"
                    label="Primary Image"
                    type="file"
                    inputClassName="border-[#FB923C]"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const previewUrl = URL.createObjectURL(file);
                        setImagePreviews((prev) => [previewUrl, ...prev.slice(1)]);
                      }
                    }}
                  />
                  {imagePreviews[0] && (
                    <div className="mt-3 w-24 h-24 border border-[#FB923C] rounded overflow-hidden">
                      <img
                        src={imagePreviews[0]}
                        alt="Primary Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Other Images */}
                <div>
                  <FormInput
                    name="otherImages"
                    label="Other Images"
                    type="file"
                    inputClassName="border-[#FB923C]"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const previews = files.map((file) => URL.createObjectURL(file));
                      setImagePreviews((prev) => [prev[0], ...previews]); // keep primary first
                    }}
                  />

                  {imagePreviews.slice(1).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {imagePreviews.slice(1).map((preview, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 rounded border border-[#FB923C] overflow-hidden"
                        >
                          <img
                            src={preview}
                            alt={`Other preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type='button'
                            variant="outline"
                            size="icon"
                            className="absolute top-2 right-4 -translate-y-1/2 translate-x-1/2"
                            onClick={() => {
                              const form = useFormContext<FormValues>();
                              const otherImages = form.getValues("otherImages");
                              // adjust the array removing that image
                              otherImages.splice(index + 1, 1);
                              form.setValue("otherImages", otherImages);
                              setImagePreviews((prev) =>
                                prev.filter((_, i) => i !== index + 1)
                              );
                            }}
                          >
                            x
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>


            <FormInput name="videoUrl" label="Video URL" placeholder="Optional video link" inputClassName="border-[#FB923C]" />

            {/* Variants */}
            <Card className="border-[#FB923C]">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Variants</CardTitle>
                <SizesCheckboxes selectedSizes={selectedSizes} />
              </CardHeader>
              <CardContent>
                <VariantsSection selectedSizes={selectedSizes} />
                <div className="flex flex-wrap gap-2">
                  <AddVariantButton selectedSizes={selectedSizes} />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput name="supplier" label="Supplier" placeholder="Product Supplier" inputClassName="border-[#FB923C]" />
              <PublishedSwitch />
            </div>
          </FormWrapper>
        </CardContent>
      </Card>
    </div >
  );
};

export default AddProductPage;
