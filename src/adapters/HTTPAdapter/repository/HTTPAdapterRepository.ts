export interface HTTPAdapterRepository{

    listen(): void;

    setRoutes(): void;

    config(): void;

}