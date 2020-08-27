'use stric';
(()=>{
    // APP Data Base;
    const pathnameNow = window.location.pathname;
    const urlHistorys = 'js/historys.json';
    const urlNovedades = 'js/novedades.json';
    const requestHandlerHistorys = async(lengthCard)=>{
        const db = await fetch(urlHistorys).then((res) => { return res.json() });
        showCard($('#wrapper-historys'),lengthCard, db);
        return db;
    };
    const requestHandlerNovedades = async(lengthCard)=>{
        const db = await fetch(urlNovedades).then((res) => { return res.json() });
        showCard($('#wrapper-novedades'),lengthCard, db);
        return db;
    };
    // Function Expretion;
    const $ = selector => document.querySelector(selector);
    const $fragment = document.createDocumentFragment();

    
    const strongParagraph = (paragraph) => {
        let patternLastCharacter = /\*[a-z]/gi;
        let patternFirtCharacter = /[a-z]\*/gi;

        while (paragraph.search(patternLastCharacter) != -1 && paragraph.search(patternFirtCharacter) != -1) {
            let characterOpen = paragraph.search(patternLastCharacter);
            let letterOpen = paragraph[characterOpen] + paragraph[++characterOpen];

            paragraph = paragraph.replace(letterOpen, '<strong>' + paragraph[characterOpen]);

            let characterClose = paragraph.search(patternFirtCharacter);
            let letterClose = paragraph[characterClose] + paragraph[++characterClose];


            paragraph = paragraph.replace(letterClose, paragraph[--characterClose] + '</strong>');
        }

        return paragraph;
    }
    const thoroughParagraph = (paragraph) => {
        let patternLastCharacter = /\~[a-z]/gi;
        let patternFirtCharacter = /[a-z]\~/gi;

        while (paragraph.search(patternLastCharacter) != -1 && paragraph.search(patternFirtCharacter) != -1) {
            let characterOpen = paragraph.search(patternLastCharacter);
            let letterOpen = paragraph[characterOpen] + paragraph[++characterOpen];

            paragraph = paragraph.replace(letterOpen, '<i class="line-through">' + paragraph[characterOpen]);

            let characterClose = paragraph.search(patternFirtCharacter);
            let letterClose = paragraph[characterClose] + paragraph[++characterClose];


            paragraph = paragraph.replace(letterClose, paragraph[--characterClose] + '</i>');
        }

        return paragraph;
    }
    const italicParagraph = (paragraph) => {
        let patternLastCharacter = /\_[a-z]/gi;
        let patternFirtCharacter = /[a-z]\_/gi;

        while (paragraph.search(patternLastCharacter) != -1 && paragraph.search(patternFirtCharacter) != -1) {
            let characterOpen = paragraph.search(patternLastCharacter);
            let letterOpen = paragraph[characterOpen] + paragraph[++characterOpen];

            paragraph = paragraph.replace(letterOpen, '<i class="italic">' + paragraph[characterOpen]);

            let characterClose = paragraph.search(patternFirtCharacter);
            let letterClose = paragraph[characterClose] + paragraph[++characterClose];


            paragraph = paragraph.replace(letterClose, paragraph[--characterClose] + '</i>');
        }

        return paragraph;
    }

    const messege = (messege, type,icon)=>{
        if($('#messege') != undefined)
        {$('body').removeChild($('#messege'));}

        const $div = document.createElement('div');
        const $p = document.createElement('p');
        const $span = document.createElement('span');
        const $i = document.createElement('i');

        $div.id = 'messege';
        $div.className = `w-10/12 max-w-screen-md fixed bottom-0 left-0 right-0 flex justify-start items-center bg-${type}-300 text-${type}-700 rounded shadow-md py-4 pr-4 mb-12 mx-auto`;
        
        $i.className = `fa fa-${icon} fa-2x`;
        $span.className = 'flex justify-center items-center px-4';
        $p.innerHTML = messege;

        $span.appendChild($i);
        $div.appendChild($span);
        $div.appendChild($p);
        $("body").insertBefore($div, $('footer'));

        const timeMessege = setTimeout(() => {
            $('body').removeChild($('#messege'));
        },10000);
    }

    const $post = async (url) => {
        const db = await fetch(url).then((res) => { return res.json()});
        const id = '1234';
        const post = await db.reduce((db)=>{
            if(db.id === id){
                return db;
            }
        });
        const $article = $("#post");
        const $h1 = document.createElement('h1');
        const $img = document.createElement('img');
        $h1.className = "w-full text-4xl md:text-5xl text-gray-800 text-center font-bold mb-2";
        $h1.textContent = post.post[0].title;

        $img.className = "w-full sm:w-64 float-left rounded overflow-hidden shadow-md mx-auto  sm:mr-4 mb-3";
        $img.setAttribute('src', post.img.url);

        
        $fragment.appendChild($h1);
        $fragment.appendChild($img);
        
        const arrayP = post.post[0].paragraph;
        for (let index = 0; index < arrayP.length; index++) {
            let element = arrayP[index];
            element = strongParagraph(element);
            element = thoroughParagraph(element);
            element = italicParagraph(element);
            const $p = document.createElement('p');
            $p.className = 'w-full paragraph text-gray-700 leading-snug mb-2';
            $p.innerHTML = element;

            $fragment.appendChild($p);

        }
        $article.innerHTML = '';
        $article.appendChild($fragment);
    }

    const $card = (id, urlImg, title, description, tag) => {
        let classTag = 'orange'
        if (tag != 'historias') { classTag = 'teal'; }

        const $card = document.createElement('div');
        $card.id = id;
        $card.className = 'max-w-lg w-full sm:flex mx-auto  rounded shadow-md  overflow-hidden';

        const $imgCard = document.createElement('div');
        $imgCard.className = 'h-48 h-auto w-48 flex-none bg-cover md:bg-center';
        $imgCard.style.backgroundImage = `url(${urlImg})`;

        const $bodyCard = document.createElement('div');
        $bodyCard.className = `flex flex-col justify-between bg-white border-l-4 md:border-l-0 md:border-r-4 border-solid border-${classTag}-800 cursor-pointer py-4 px-6`;

        const $div = document.createElement('div');
        const $titleCard = document.createElement('h2');
        $titleCard.className = 'text-gray-800 font-bold text-left text-xl capitalize mb-2';
        $titleCard.innerText = title;
        const $descriptionCard = document.createElement('p');
        $descriptionCard.className = 'text-gray-700 text-base leading-snug';
        $descriptionCard.innerText = description;

        const $footerCard = document.createElement('div');
        $footerCard.className = 'mt-4';
        const $tagCard = document.createElement('span');
        $tagCard.className = `inline-block bg-${classTag}-200 text-${classTag}-800 font-bold rounded-full py-2 px-4`;
        $tagCard.innerText = "#" + tag;


        $div.appendChild($titleCard);
        $div.appendChild($descriptionCard);

        $footerCard.appendChild($tagCard);

        $bodyCard.appendChild($div);
        $bodyCard.appendChild($footerCard);

        $card.appendChild($imgCard);
        $card.appendChild($bodyCard);

        return $card;
    };

    const showCard = ($wrapper,lengthCard,db) => {
        let totalCard = 6;
        
        if(lengthCard -2 === db.length)
        {
            hiddenLoader($wrapper); 
            return messege('No hay mas contenido disponible.', 'blue', 'book');
        }

        if (lengthCard != 0) 
        {
            lengthCard = lengthCard - 2;
            totalCard = lengthCard + 2;
            if(totalCard > db.length)
            {totalCard = db.length;}
        }

        for (lengthCard; lengthCard < totalCard; lengthCard++) {
            const cards = db[lengthCard];
            if (cards != undefined) { 
                let description = cards.post[0].paragraph[0];
                let newDescription = '';
                for (let index = 0; index < 80; index++) {
                    let valor_actual = description[index];
                    if (valor_actual == undefined) {
                        break;
                    } else {
                        newDescription += valor_actual;
                    }
                }
                newDescription += '...';
                $fragment.appendChild($card(cards.id, cards.img.url, cards.post[0].title, newDescription, cards.tag));
                continue;
            }
            break;
        }

        let posicionAntepenultima = $wrapper.children.length - 2;
        let antepenultima = $wrapper.children[posicionAntepenultima];

        $wrapper.insertBefore($fragment, antepenultima);
        hiddenLoader($wrapper);
    }

    const hiddenLoader = ($wrapper) => {
        for (let index = --$wrapper.children.length; index >= 0 ; index--) {
            const element = $wrapper.children[index];
            if(element.classList[9] === 'preloader-card'){
                element.classList.add('d-none');
                continue;
            }
            break;
            }
    }

    const showLoader = ($wrapper) => {
        for (let index = --$wrapper.children.length; index >= 0 ; index--) {
            const element = $wrapper.children[index];
            if(element.classList[9] === 'preloader-card'){
                element.classList.remove('d-none');
                continue;
            }
            break;
            }
    }


    
    // Nodo;
    const $btnMoreHistory = $('#btn-more-history') || undefined;
    const $btnMoreNovedad = $('#btn-more-novedad') || undefined;



    // Event Nodo;
    if($btnMoreHistory != undefined){
        $btnMoreHistory.addEventListener('click', (e) => {
            e.preventDefault();
            showLoader($('#wrapper-historys'));
            let lengthCard = $('#wrapper-historys').children.length;
            setTimeout(() => {
                requestHandlerHistorys(lengthCard);
            }, 3000);
        });
    }
    if($btnMoreNovedad != undefined){
        $btnMoreNovedad.addEventListener('click', (e) => {
            e.preventDefault();
            showLoader($('#wrapper-novedades'));
            let lengthCard = $('#wrapper-novedades').children.length;
            setTimeout(() => {
                requestHandlerNovedades(lengthCard);
            }, 3000);
        });
    }



    // Event Window;
    window.addEventListener('load', (e)=>{
        if(pathnameNow.search('historia.html') != -1){
            console.log("cargando contenido para: "+pathnameNow);
            $post('js/historys.json');
        }else if(pathnameNow.search('novedad.html') != -1){
            console.log("cargando contenido para: "+pathnameNow);
            $post('js/novedades.json');
        }


        requestHandlerHistorys(0);
        requestHandlerNovedades(0);
        
        $('#preloader-post').classList.add('d-none');
        $('#post').classList.remove('hidden');
        
        let timeMessege = setTimeout(() => {
            messege('Este sitio web hace uso de cookies!', 'indigo','cookie');
        }, 9000);
    });
})();
