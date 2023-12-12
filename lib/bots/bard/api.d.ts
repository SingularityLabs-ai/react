export declare function fetchRequestParams(): Promise<{
    atValue: string | undefined;
    blValue: string | undefined;
}>;
export declare function parseBardResponse(resp: string): {
    text: string;
    ids: [string, string, string];
};
