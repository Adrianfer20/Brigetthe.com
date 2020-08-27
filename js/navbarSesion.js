(()=>{
    // Page Sesion;
    const sesionStatus = localStorage.getItem('sesion');
    if(sesionStatus != 'false'){
        let pagina = window.location.pathname;
        if(pagina === '/index.html' || pagina === '/sesion.html'){
            window.location.href = 'document.html';
        }
    }
    // Data Base;
    const urlUser = 'js/users.json';

    // function Exprestion;
    const $ = selector => document.querySelector(selector);

    const readerUsers = async (user,password) =>{
        const db = await fetch(urlUser).then((res) => { return res.json() });
        const statusUser = db.filter((db)=>{if(db.user === user && db.password === password){return db}});
        if(statusUser.length === 0){$('#user').focus();return messege('No hemos encontrados coincidencias en nuestras base de datos.', 'red');};
        
        messege('Ah iniciado sadisfactoriamente... redirigiendo...', 'green');
        localStorage.setItem("sesion", true);
        setTimeout(() => {
            window.location.href = 'document.html';
        }, 2000);
    };

    const messege = (messege,type)=>{
        const $boxMessege = $('#box-messege');
        const $messege = $('#box-messege').children[1];
        $boxMessege.className = `w-10/12 max-w-screen-md fixed bottom-0 left-0 right-0 flex justify-start items-center bg-${type}-300 text-${type}-700 rounded shadow-md py-4 pr-4 mb-12 mx-auto`;
        $messege.innerText = messege;
    }

    // Nodos;
    const $btnNav = $('#btn-nav');
    const $navbar = $('#nav');
    const $btnSesion = $('#btn-sesion');
    const $btnCloseSesion = $('#btn-close-sesion') || undefined;
    const $form = $('#form-login') || undefined;
    

    // Event Nodo;
    $btnNav.addEventListener('click', (e) => {
        $navbar.classList.toggle('hidden');
    });
    
    $btnSesion.addEventListener('click', (e)=>{
        window.location.href =  'sesion.html';
    });

    if($btnCloseSesion!=undefined){
        $btnCloseSesion.addEventListener('click',(e)=>{
            localStorage.setItem('sesion', false);
            window.location.href = 'index.html';
        })
    }

    if($form != undefined){
        $form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const user = $('#user').value;
            const password = $('#password').value;
            
            if (!user){
                $('#user').className = 'focus:outline-none border-solid border-2 focus:border-red-600 rounded py-2 px-4';
                $('#user').setAttribute('placeholder', 'No olvides ingresar tu usuario.');
                return $('#user').focus();
            }
            if (!password){
                $('#password').className = 'focus:outline-none border-solid border-2 focus:border-red-600 rounded py-2 px-4';
                $('#password').setAttribute('placeholder', 'No olvides ingresar tu contraseña.');
                return $('#password').focus();
            }
            
            $('#box-messege').style.left = '0';
            messege('Espere un momento mientras evaluamos sus credenciales.', 'indigo');
            $form.reset();
            setTimeout(() => {
                readerUsers(user, password);
            }, 2000);
        });
    };
    
    // Event Window;
    window.addEventListener('scroll', (e) => {
        $navbar.classList.add('hidden');
    });
})();