class Producto{
        
    constructor(codigo, nombre, cantidad, costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.siguiente=null;
    };

    info(){
        return `Código  ${this.codigo} --- Producto:${this.nombre} --- Cantidad: ${this.cantidad} --- Precio: $${this.costo}`
    }
};

class Inventario{
        
    constructor(){
        this.listaProductos = new Array();
        this.primero=null;
    };

    agregar(producto){
        if(this.buscar(producto.codigo)==null){
            if(this.primero==null){
                this.primero=producto
            }else{
                this.agregarSiguiente(producto,this.primero);
            }
            return true;
        }
        return false;
    }

    agregarSiguiente(producto,nodo){
        if(nodo.siguiente==null){
            nodo.siguiente =producto
        }else{
            this.agregarSiguiente(producto,nodo.siguiente)
        }
    }

    eliminar(codigo){
        let aux=this.primero
        if(aux.codigo==codigo){
            this.primero = aux.siguiente
            return true;
        }else{
            let siguiente = null;
            while(aux.siguiente!=null){
                siguiente= aux.siguiente;
                if(siguiente.codigo==codigo){
                    aux.siguiente=aux.siguiente.siguiente
                    return true;
                }else{
                    aux=aux.siguiente;
                }
            }
            return false;
        }
    };    

    buscar(codigo){
        let aux=this.primero
        while(aux!=null){
            if(aux.codigo==codigo){
                return aux
            }else{
                aux=aux.siguiente;
            }
        }
        return null;
    }

    listar(){
        let lista = "";
        if(this.primero==null){
            return lista="El inventario NO tiene productos";
        }
        lista = "<br>"+this.recorrerLista(this.primero);
        return `                LISTA
        <br>${lista}`;
    };
    
    recorrerLista(nodo){
        if(nodo.siguiente==null){
          return nodo.info()+"<br>";
        } else {
        return nodo.info()+"<br>"+`${this.recorrerLista(nodo.siguiente)}`
        }
    }

    recorrerListaInverso(nodo){
        if(nodo.siguiente==null){
          return nodo.info()+"<br>";
        }
        return `${this.recorrerListaInverso(nodo.siguiente)}`+nodo.info()+"<br>";
    }


    listarInverso(){
        let lista = "";
        if(this.primero==null){return lista="El inventario NO tiene productos"}
        lista = "<br>"+this.recorrerListaInverso(this.primero);
        return `                LISTA INVERSA
        <br>${lista}`;
    };
};

const miInv = new Inventario()

const btnAgregar = document.getElementById('btnAgregar')
btnAgregar.addEventListener('click', () => {
    const codigo = document.getElementById('txtCodigo').value
    const nombre = document.getElementById('txtNombre').value
    const cantidad = document.getElementById('txtCantidad').value
    const costo = document.getElementById('txtCosto').value
    const producto = new Producto(parseInt(codigo), nombre, cantidad, costo);
    if (codigo=="") {
        document.getElementById("listado").innerHTML = `No se agregó el producto porque NO tiene código<br>`
    }else{
        res = miInv.agregar(producto)
        if(res==true){
            document.getElementById("listado").innerHTML = `El producto ${nombre} con código ${codigo} fue agregado<br>`
        }
        else if(res==false){
            document.getElementById("listado").innerHTML =`NO se agregó el producto porque el código ${codigo} ya está en uso<br>`;
        }
    }
});

const btnEliminar = document.getElementById('btnEliminar')
btnEliminar.addEventListener('click', () => {
    const codigo = document.getElementById('txtCodigo').value
    if (miInv.buscar(codigo) == null) {
        document.getElementById("listado").innerHTML=`El producto con codigo: ${codigo} NO pudo ser eliminado porque no existe`
    } else{
        miInv.eliminar(codigo)
        document.getElementById("listado").innerHTML=`El producto con codigo: ${codigo} fue eliminado`

    }

})

const btnBuscar = document.getElementById('btnBuscar')
btnBuscar.addEventListener('click', () => {
    const codigo = document.getElementById('txtCodigo').value
    let producto = miInv.buscar(codigo);
    if(miInv.buscar(codigo) == null){
        document.getElementById("listado").innerHTML=`<p>El producto con código ${codigo} NO fue encontrado</p>`
    } else {
        document.getElementById("listado").innerHTML=`<p>El producto con código ${codigo} fue encontrado</p><br>
        ${producto.info()}`
    }
})


const btnListar = document.getElementById('btnListar')
btnListar.addEventListener('click', () => {
    document.getElementById("listado").innerHTML=`<p>${miInv.listar()}<br></p>`
});

const btnListarInverso = document.getElementById('btnListarInverso')
btnListarInverso.addEventListener('click', () => {
    document.getElementById("listado").innerHTML=`<p>${miInv.listarInverso()}<br></p>`
});