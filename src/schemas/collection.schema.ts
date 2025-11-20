import z from "zod";

export const collectionSchema = z.object({
    collectionName: z.string().min(1, 'Collection name is required'),
    // specification: z.enum(['male', 'female', 'unisex'], { message: 'Please select a specification' }),
    published: z.boolean(),
});