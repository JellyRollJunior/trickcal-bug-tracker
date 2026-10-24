const simulateLag = async (ms: number) => {
    if (process.env.NODE_ENV !== 'production') {
        await new Promise<void>((resolve) => setTimeout(resolve, ms));
    }
};

export { simulateLag };
