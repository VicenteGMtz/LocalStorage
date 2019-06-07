/***************************     variables  ********************************************/////

const carrito=document.getElementById('carrito');
const cursos=document.getElementById('lista-cursos');
const listaCursos=document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');



/***************************  Listeners  ********************************************/////

cargarEventlisteners();

function cargarEventlisteners(){
    //dispara cuandose preciona agregar carrito
    cursos.addEventListener('click',comprarCurso);

    //dispara cuandose preciona eliminar curso de carrito
    carrito.addEventListener('click',eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click',vaciasCarrito);

    //al cargar documento mostrar localstorage

    document.addEventListener('DOMContentLoaded',leerLocalStorage);
}











//***************************  funciones  ********************************************/////

//funcion que añade el curso al carrito
function comprarCurso(e){

    e.preventDefault();
    //delegation para gregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso=e.target.parentElement.parentElement;
        //console.log(curso); optener el curso

        //crear una funcion para leer y enviar la informacion del curso
        leerDatosCurso(curso);
 
    }
   
}

//esta funcion lee los datos del curso
function leerDatosCurso(curso){

    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    //console.log(infoCurso);

    insertarCarrito(infoCurso);
}


//insertar carrito
function insertarCarrito(curso){
    const row=document.createElement('tr');
    row.innerHTML=`

        <td><img src="${curso.imagen}" width="100"> </td>
        <td> ${curso.titulo} </td>
        <td> ${curso.precio} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>  
        </td>
    `;

    listaCursos.appendChild(row);

    //guardar curso en local storge
    guardarCursoEnLocalStorage(curso);


}

//elimina el curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    let curso,cursoID;
    if(e.target.classList.contains('borrar-curso')){
        //aplicamos traversin para llegar al elemento padre
       // console.log(e.target.parentElement.parentElement.remove());
        e.target.parentElement.parentElement.remove();

        //agregar esta parate para ocuparlo en borrar local storage
        curso=e.target.parentElement.parentElement;
        cursoID=curso.querySelector('a').getAttribute('data-id');
        // verificar que funcione obtener el id console.log(cursoID);

    }

    eliminarCursoDeLocalStorage(cursoID);

}


//funcion para eliminar los cursos en el dom
function vaciasCarrito(){
    //forma lenta de borrar los cursos en carrito
   // listaCursos.innerHTML="";

    //forma rapida y recomendada

    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

  

    //VACIAR LOCAL STORAGE

    vaciarLocalStorage();
    return false;


}


//function para guradar curso en local storage
function guardarCursoEnLocalStorage(curso){
    //console.log(curso);
    let cursos;
    cursos=obtnerCursoDeLocalStorage();
    //añadir el curso actual con push
    cursos.push(curso); 
    //
    localStorage.setItem('cursos',JSON.stringify(cursos));
}


//comprueb aque exitan elementos en local storage
function obtnerCursoDeLocalStorage(){
    let cursosLS;

    //comprobaos si hay algo en local storage

    if(localStorage.getItem('cursos')===null){
        cursosLS=[];
    }else{
        cursosLS=JSON.parse(localStorage.getItem('cursos'));
    }
   
    return cursosLS;

}


//imprime los curso de localsotrage enel carrito

function leerLocalStorage(){
    let cursosLS;

    cursosLS=obtnerCursoDeLocalStorage();
    //console.log(cursosLS);

    cursosLS.forEach(function(curso){
        //construir el template
        const row=document.createElement('tr');
        row.innerHTML=`

            <td><img src="${curso.imagen}" width="100"> </td>
            <td> ${curso.titulo} </td>
            <td> ${curso.precio} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>  
            </td>
        `;

        listaCursos.appendChild(row);

        
    });
}


//eliminar curso del carrito desde local storage

function eliminarCursoDeLocalStorage(curso){
    //console,log(curso);
    let cursosLS;

    //obteneemos el arreglo de cursos
    cursosLS=obtnerCursoDeLocalStorage();

    //iteramos comparando el id curso con los de local storage
    cursosLS.forEach(function(cursoLS,index){
        //console.log(curso);
        //console.log(curso.id);

        if(cursoLS.id===curso){
            cursosLS.splice(index,1);
        }
    });


    //console.log(cursosLS);
    //añadimos el arreglo actual a storage
    localStorage.setItem('cursos',JSON.stringify(cursosLS));
    
}

//ELIMINA TODOS LOS CURSOS DE LOCALSTOREAGE

function vaciarLocalStorage(){
    localStorage.clear();

}