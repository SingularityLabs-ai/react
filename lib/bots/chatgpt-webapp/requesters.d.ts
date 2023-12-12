import Browser from 'webextension-polyfill';
import { RequestInitSubset } from '~types/messaging';
export interface Requester {
    fetch(url: string, options?: RequestInitSubset): Promise<Response>;
}
declare class GlobalFetchRequester implements Requester {
    fetch(url: string, options?: RequestInitSubset): Promise<Response>;
}
declare class ProxyFetchRequester implements Requester {
    findExistingProxyTab(): Promise<any>;
    waitForProxyTabReady(onReady: (tab: Browser.Tabs.Tab) => void): void;
    createProxyTab(): Promise<Browser.Tabs.Tab>;
    getProxyTab(): Promise<any>;
    refreshProxyTab(): Promise<any>;
    fetch(url: string, options?: RequestInitSubset): Promise<any>;
}
export declare const globalFetchRequester: GlobalFetchRequester;
export declare const proxyFetchRequester: ProxyFetchRequester;
export {};
