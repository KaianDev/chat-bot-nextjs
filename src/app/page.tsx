"use client";

import { Header } from "@/components/Header";
import { Home } from "@/components/Home";
import { Layout } from "@/components/Layout";
import { ChatProvider } from "@/contexts/ChatContext";
import { UserProvider } from "@/contexts/UserContext";

const Page = () => {
    return (
        <Layout>
            <UserProvider>
                <ChatProvider>
                    <Header />
                    <Home />
                </ChatProvider>
            </UserProvider>
        </Layout>
    );
};

export default Page;
