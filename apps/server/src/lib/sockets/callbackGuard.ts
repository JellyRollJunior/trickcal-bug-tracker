import { SocketBaseResponse } from '@trickcal-bug-tracker/shared';

const withCallbackGuard = <T extends unknown[]>(
    // take function "handler" as argument
    // declare "handler" arguments
        // ...args: rest parameter gathers up all arguments of handler
        // [...T, X]: declare "handler" arguments type as spread generic type [T] (all other arguments) and a callback function
    handler: (...args: [...T, (response: SocketBaseResponse) => void]) => void
) => {
    // return a function of type spread generic type [T] (all non callback arguments)
    // and unknown -> not validated the callback yet so we type it unknown -> client could have sent anything
    return (...args: [...T, unknown]) => {
        const callback = args[args.length - 1];
        if (typeof callback !== 'function') {
            console.warn('Socket event called without a valid callback');
            return;
        }
        // after validating callback is a function, 
        // call handler typing args with callback manually using `as`
        handler(...(args as [...T, (response: SocketBaseResponse) => void]));
    };
};

export { withCallbackGuard };
