import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";

/**
 * An injection token that wrap the actual storage used in the application.
 * 
 * @see provideStorage
 */
export const STORAGE = new InjectionToken<Storage>("The storage type used in the application");

/**
 * Create an environment providers that expose the `STORAGE` injection token. This provider can be used to wrap some elements of the application for testing purpose. This can also be used to easily abstract the used storage if more intelligence is needed to handle user preferences.
 * 
 * @exemple
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *     providers: [provideStorage()]
 * };
 * ```
 * 
 * @param storage the storage instance to used.
 * @returns an environments provider
 * 
 * @ee STORAGE
 */
export function provideStorage(storage: Storage = window.localStorage): EnvironmentProviders {
    return makeEnvironmentProviders([{
        provide: STORAGE,
        useValue: storage,
    }])
}