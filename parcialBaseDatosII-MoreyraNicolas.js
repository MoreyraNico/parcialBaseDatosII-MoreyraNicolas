//ALUMNO: NICOLAS MOREYRA
//DNI: 33744738
//DIVISION: 132
//FECHA: 22/05/2025
//DOCENTE: SCUDERO YANINA

// 1)Crear el script .js con la creación de la base de datos y las colecciones.
//use cafeteria
db.cafesEspeciales.drop()
load("parcialBaseDatosII-MoreyraNicolas.js")

db.cafesEspeciales.insertMany([
    {
    tipo: "espresso",
    ingredientes: ["chocolate"],
    peso: 300,
    intensidad: "alta",
    precios: [
        { tipo: "efectivo", precio: 500},
        { tipo: "tarjeta", precio: 600}
    ],
    contieneLeche: false,
    tostador: {
        localidad: "Quilmes",
        nombre: "Espresso Quilmes",
        cuit: "19-12345678-9"        
    }
},
{
    tipo: "filtrado",
    ingredientes: ["caramel","canela"],
    peso: 310,
    intensidad: "alta",
    precios: [
        { tipo: "efectivo", precio: 430},
        { tipo: "tarjeta", precio: 530}
    ],
    contieneLeche: true,
    tostador: {
        localidad: "San Miguel",
        nombre: "Filtrado San Miguel",
        cuit: "20-12345678-9",
    }
},
{
    tipo: "cold brew",
    ingredientes: ["vainilla","coco"],
    peso: 250,
    intensidad: "baja",
    precios: [
        { tipo: "efectivo", precio: 500},
        { tipo: "tarjeta", precio: 600}
    ],
    contieneLeche: true,
    tostador: {
        localidad: "Santos Lugares",
        nombre: "Cold Brew Santos Lugares",
        cuit: "21-11111111-1",
    }
},
{
    tipo: "descafeinado",
    ingredientes: ["caramel"],
    peso: 210,
    intensidad: "baja",
    precios: [
        { tipo: "efectivo", precio: 450},
        { tipo: "tarjeta", precio: 550}
    ],
    contieneLeche: false,
    tostador: {
        localidad: "Avellaneda",
        nombre: "Descafeinado Avellaneda",
        cuit: "22-222222222-2",
    }
},
{
    tipo: "espresso",
    ingredientes: ["chocolate","canela"],
    peso: 220,
    intensidad: "media",
    precios: [
        { tipo: "efectivo", precio: 560},
        { tipo: "tarjeta", precio: 660}
    ],
    contieneLeche: false,
    tostador: {
        localidad: "Quilmes",
        nombre: "Espresso Quilmes",
        cuit: "19-12345678-9",
    }
},
{
    tipo: "filtrado",
    ingredientes: ["vainilla","canela"],
    peso: 240,
    intensidad: "media",
    precios: [
        { tipo: "efectivo", precio: 590},
        { tipo: "tarjeta", precio: 690}
    ],
    contieneLeche: false,
    tostador: {
        localidad: "San Miguel",
        nombre: "Filtrado San Miguel",
        cuit: "20-12345678-9",
    }
},
{
    tipo: "cold brew",
    ingredientes: ["coco","menta"],
    peso: 170,
    intensidad: "media",
    precios: [
        { tipo: "efectivo", precio: 610},
        { tipo: "tarjeta", precio: 710}
    ],
    contieneLeche: false,
    tostador: {
        localidad: "Santos Lugares",
        nombre: "Cold Brew Santos Lugares",
        cuit: "21-11111111-1",
    }
},
{
    tipo: "espresso",
    ingredientes: ["chocolate","caramelo"],
    peso: 220,
    intensidad: "baja",
    precios: [
        { tipo: "efectivo", precio: 430},
        { tipo: "tarjeta", precio: 530}
    ],
    contieneLeche: true,
    tostador: {
        localidad: "Quilmes",
        nombre: "Espresso Quilmes",
        cuit: "19-12345678-9",
    }
},
{
    tipo: "descafeinado",
    ingredientes: ["vainilla"],
    peso: 300,
    intensidad: "media",
    precios: [
        { tipo: "efectivo", precio: 560},
        { tipo: "tarjeta", precio: 660}
    ],
    contieneLeche: true,
    tostador: {
        localidad: "Avellaneda",
        nombre: "Descafeinado Avellaneda",
        cuit: "22-222222222-2",
    }
},
{
    tipo: "filtrado",
    ingredientes: ["caramelo","chocolate"],
    peso: 320,
    intensidad: "baja",
    precios: [
        { tipo: "efectivo", precio: 500},
        { tipo: "tarjeta", precio: 600}
    ],
    contieneLeche: false,
    tostador: {
        localidad: "San Miguel",
        nombre: "Filtrado San Miguel",
        cuit: "20-12345678-9",
    }
}
]
)

// 2) Buscar cuántos cafés contienen chocolate entre sus ingredientes.

db.cafesEspeciales.aggregate([{ $match: { ingredientes: "chocolate" }},{ $count: "cafesConChocolate"}])
//[ { cafesConChocolate: 4 } ]

// 3) Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes.

db.cafesEspeciales.aggregate([{ $match: { tipo: "cold brew", ingredientes: "vainilla"}},{ $count: "coldBrewConVainilla"}])

// 4) Listar tipo y peso de los cafés que tienen una intensidad “media”.

db.cafesEspeciales.aggregate([{ $match: { intensidad: "media"}},{ $project: { _id: 0, tipo: 1, peso: 1}}])

// 5) Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.

db.cafesEspeciales.aggregate([{ $match: { peso: { $gte: 200, $lte: 260}}},{ $project: { _id: 0, tipo: 1, peso: 1, intensidad: 1 }}])

// 6) Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san” y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera descendente.

db.cafesEspeciales.aggregate([{ $match: { "tostador.localidad":{ $regex: "san", $options: "i" }}},{ $sort: { pespeso: -1}},{ $project: { _id: 0, tipo: 1, peso:1, "tostador.localidad":1}}])

// 7) Mostrar la sumar del peso de cada tipo de Café.

db.cafesEspeciales.aggregate([{ $group: { _id: "$tipo", pesoTotal: { $sum: "$peso"}}},{ $project: { _id: 0, tipo: "$_id", pesoTotal: 1}}])

// 8) Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.

db.cafesEspeciales.updateMany({ intensidad: "alta"},{$push: { ingredientes:"whisky"}})

// 9) Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.

db.cafesEspeciales.updateMany({ peso: { $gte: 200, $lte: 260}},{$inc: { peso:10}})

// 10) Eliminar los cafés cuyo peso sea menor o igual a 210.

db.cafesEspeciales.deleteMany({ peso: { $lte: 210}})

