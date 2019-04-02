export interface ObjRespuestaServidor {
  "data": any,
  "status": string
}

export interface ObjPedido {

  cantidad: number,
  created_at: string,
  estado: string,
  forma_de_pago: string,
  id: number,
  periodicidad: string,
  producto_id: number,
  repartidor_excepcional: string,
  repartidor_habitual: string,
  tipo_de_pedido: string,
  updated_at: string,
  user_id: number
}

export interface ObjEntregas {
  
}
