const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit',buscarClima )
});

function buscarClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos Campos son obligatorios');
    
    }
}


function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

     if(!alerta){

    const alerta = document.createElement('div');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4',
    'py-3', 'rounded','max-w-md', 'mx-auto', 'mt-6', 'text-center' );

    alerta.innerHTML = `
        <strong class = "font-bold"> Error!</strong>
        <span class = "block"> ${mensaje}</span>
    `;
    container.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 5000);    

     }

}