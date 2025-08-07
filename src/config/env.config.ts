//Esstoy regresando un objeto = () = >({})
//se esta mapeado a una variable de entorno a un objeto
export const EnvConfiguration = () => ({
    environment:process.env.NODE_ENV || 'dev',
    mongodb:process.env.MONGODB,
    port:process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT! || 7
});
