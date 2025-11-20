import { Metadata } from "next";
import MyOrders from "./_components/MyOrders";

export const metadata: Metadata = {
    title: "My Orders | Bengalians Lifestyles Ltd",
    description: "View all your past and current perfume orders.",
    openGraph: {
        title: "My Orders | Bengalians Lifestyles Ltd",
        description: "View all your past and current perfume orders.",
        url: "https://www.bengalians.com/orders",
    },
};

export default function () {
    return (
        <MyOrders />
    );
}