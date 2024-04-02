"use client"
import { apolloClient } from "@/lib/graphql";
import theme from "@/styles/theme";
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React, { FC, ReactNode, useLayoutEffect } from "react"

interface Props {
    children?: ReactNode;
}

const Providers: FC<Props> = (props) => {
    const { children } = props;
    const isConnected = useAndromedaStore(state => state.isConnected)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)

    useLayoutEffect(() => {
        initiateKeplr();
    }, []);

    useLayoutEffect(() => {
        const autoconnect = localStorage.getItem(KEPLR_AUTOCONNECT_KEY);
        if (!isLoading && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
            if (!isConnected) {
                connectAndromedaClient();
            }
        }
    }, [keplr, isConnected, isLoading]);

    return (
        <ApolloProvider client={apolloClient}>
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    <ColorModeScript storageKey="ANDR_NEXTJS_STARTER" initialColorMode={theme.config.initialColorMode} />
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </ApolloProvider>
    )
}

export default Providers