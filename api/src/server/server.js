import cors from 'cors'
import express from 'express'
import { databaseConnect } from '../database/DatabaseConfig.js'
import hola from '../routes/hola.routes.js'
import {
  AlmacenesRouter,
  ProductosRouter,
  FormulasRouter,
  EmbalajesProducto,
  ProductosEmbalajados,
  TiposDocumentos,
  Procesos,
  Usuarios,
  Roles,
  Proveedores,
  Empresa,
  OrdenesCompra
} from '../routes/index.routes.js'

class Server {
  constructor() {
    //  Creation of app with express
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      hola: '/api',
      almacenes: '/api/almacenes',
      formulas: '/api/formulas',
      productos: '/api/productos',
      embalajeProducto: '/api/embalajesproducto',
      productosEmbalajados: '/api/productosembalajados',
      tiposDocumentos: '/api/tiposdocumentos',
      procesos: '/api/procesos',
      usuarios: '/api/usuarios',
      roles: '/api/roles',
      proveedores: '/api/proveedores',
      empresa: '/api/empresa',
      ordenesCompra: '/api/ordenescompra',
    }

    // Func to Connect DB
    this.conectDB()

    this.middlewares()

    this.routes()
  }

  async conectDB() {
    await databaseConnect()
  }

  middlewares() {
    // CORS
    this.app.use(cors())
    // Read and Parse of request from body
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.hola, hola)
    this.app.use(this.paths.almacenes, AlmacenesRouter)
    this.app.use(this.paths.formulas, FormulasRouter)
    this.app.use(this.paths.productos, ProductosRouter)
    this.app.use(this.paths.embalajeProducto, EmbalajesProducto)
    this.app.use(this.paths.productosEmbalajados, ProductosEmbalajados)
    this.app.use(this.paths.tiposDocumentos, TiposDocumentos)
    this.app.use(this.paths.procesos, Procesos)
    this.app.use(this.paths.usuarios, Usuarios)
    this.app.use(this.paths.roles, Roles)
    this.app.use(this.paths.proveedores, Proveedores)
    this.app.use(this.paths.empresa, Empresa)
    this.app.use(this.paths.ordenesCompra, OrdenesCompra)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App Listening at http://localhost:${this.port}`)
    })
  }
}

export default Server
