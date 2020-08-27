'use stric';
(() => {
    const Post = {};
    // {
    //     "id" : "#0PQ",
    //     "type": "history",
    //     "post":[
    //         {
    //             "title":"Queso Rancio.",
    //             "paragraph":["Lorem One", "Lorem Two", "Lorem three"]
    //         },
    //         {
    //             "subTitle":"Preparacion del queso.",
    //             "paragraph":["Lorem One", "Lorem Two", "Lorem three"]
    //         },
    //         {
    //             "subTitle":"Comernos el queso.",
    //             "paragraph":["Lorem One", "Lorem Two", "Lorem three"]
    //         }
    //     ],
    //     "postDay":{
    //         "day": "20",
    //         "month": "Junio",
    //         "year": "2020"
    //     }
    // };


    // Function
    const $ = (selector) => document.querySelector(selector);

    // UI
    const creatNodo = (dom, content, id, clases) => {
        const elemento = document.createElement(dom);

        if (elemento.tagName != 'IMG' && content != undefined) { elemento.innerText = content; }
        if (clases != undefined) { elemento.className = clases; }
        if (id != undefined) { elemento.id = id; }

        return elemento;
    }



    const saveParagraph = (text) => {
        if (Post.post[0].paragraph === undefined) {
            Post.post[0]["paragraph"] = [text];
        } else {
            Post.post[0].paragraph.push(text);
        }
    }

    const setNodo = ($nodo, $fragment) => {
        $nodo.innerHTML = '';
        $nodo.appendChild($fragment);
    }

    const show = elemento => elemento.classList.remove('hidden');
    const hidden = elemento => elemento.classList.add('hidden');

    const setWalkPost = (textH3, textP) => {
        const $div = $('#walkPost');
        $div.children[0].innerText = textH3;
        $div.children[1].innerText = textP;
    }

    const btnOn = (btn) => {
        btn.classList.add('bg-green-300');
        btn.classList.add('cursor-pointer');

        btn.classList.remove('bg-gray-300');
        btn.classList.remove('cursor-default');
    }
    const btnOff = (btn) => {
        btn.classList.add('bg-gray-300');
        btn.classList.add('cursor-default');

        btn.classList.remove('bg-green-300');
        btn.classList.remove('cursor-pointer');

    }
    const inputOn = (input) => {
        input.classList.add('border-green-300');
        input.classList.remove('border-gray-300');
    }
    const inputDisable = (input) => {
        removeClass(input, ['border-green-700']);
        addClass(input, ['border-gray-600']);
    }

    const addClass = (elemento, clases) => { clases.forEach(clase => { elemento.classList.add(clase); }); }
    const removeClass = (elemento, clases) => { clases.forEach(clase => { elemento.classList.remove(clase); }); }


    const capitalize = (palabra) => {
        let letra = palabra.charAt(0);
        letra = letra.toUpperCase();
        palabra = palabra.replace(palabra.charAt(0), letra);
        return palabra;
    }

    const puntoEnd = (parrafo) => {
        let position = parrafo.length;
        const endSimbol = parrafo.charAt(--position);
        if (endSimbol != '.') {
            parrafo = parrafo + '.';
        }
        return parrafo;
    }

    const dotParagraph = (paragraph) => {
        let patron = /\. [a-z]/g;
        let paragraphSearch = paragraph.search(patron);
        if (paragraphSearch != -1) {
            let palabra = paragraph.substring(paragraphSearch--, paragraphSearch + 4);
            let palabraDespues = palabra.toUpperCase();
            paragraph = paragraph.replace(palabra, palabraDespues);
        }
        return paragraph;
    }

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

    // Funtion Declaration;
    const clickBtnTitle = () => {
        let inputValue = $('#inputTitle').value;
        if (inputValue != '') {
            Post["post"] = [{ title: inputValue }];

            let $article = $('#post');
            let h2 = creatNodo('h2', Post.post[0].title, undefined, 'w-full text-5xl text-gray-800 text-center font-bold mb-2');

            $article.innerHTML = '';
            $article.appendChild(h2);

            setWalkPost('¡Bien hecho!', 'Ahora tienes que agregar contenido a tu historia.');


            let $li = $('#progressPost').children[0];
            addClass($li, ['bg-green-700']);

            // New Form
            let $input = creatNodo('input', undefined, 'inputImg', 'hidden');
            let $label = creatNodo('label', 'Subir imagen', 'btnImg', 'w-full block bg-green-300 transition duration-300 ease-in-out text-gray-700 text-center uppercase rounded shadow-md cursor-pointer px-4 py-2 my-2 mx-auto')

            let $fragment = document.createDocumentFragment();
            $fragment.innerHTML = '';
            $input.setAttribute('type', 'file');
            $fragment.appendChild($input);
            $label.setAttribute('for', 'inputImg');
            $fragment.appendChild($label);

            setNodo($('#form'), $fragment);
        }
    }

    const clickBtnParagraph = (e) => {
        if ($('#inputParagraph').value != '') {
            let paragraph = puntoEnd($('#inputParagraph').value);
            saveParagraph(paragraph);


            let $p = creatNodo('p', undefined, undefined, 'w-full paragraph text-gray-700 leading-snug mb-2');
            $('#post').appendChild($p);

            if (document.querySelectorAll('.paragraph').length > 3 && $('#btnHistory') === null) {
                setWalkPost('¡En hora buena!', 'Puedes guardar tu historia; No olvides revisarla.');

                const $button = creatNodo('button', 'guardar historia', 'btnHistory', 'w-full block bg-green-300 text-gray-700 uppercase focus:outline-none rounded py-2 px-4 mt-4 mx-auto');
                $('#form').appendChild($button);
                let $li = $('#progressPost').children[2];
                addClass($li, ['bg-green-700']);
            }

            $('#inputParagraph').value = '';
            $('#inputParagraph').focus();
        }
    }
    const clickBtnPost = () => {
        // Evaluar si existe algun contenido en el input paragraph; de ser asi avisar a admin;
        if ($('#inputParagraph').value != '') {
            setWalkPost('¡Espera!', 'Primero debes guardar el párrafo existente dentro del textarea párrafo.');
        } else {
            $('#form').innerHTML = '';
            console.log(Post);
            setWalkPost('¡Listo!', 'Has podido guardar tu historia con exito.');
            let $li = $('#progressPost').children[3];
                addClass($li, ['bg-green-700']);
        }

    }

    // Nodos;
    const $form = $('#form');


    // Event DOM
    $form.addEventListener('click', (e) => {
        // Evaluar si el click fue en el BTN title;
        if (e.target.matches('button#btnTitle')) {
            e.preventDefault();
            clickBtnTitle();
        }
        // Evaluar si el click fue en el BTN paragraph;
        else if (e.target.matches('button#btnParagraph')) {
            e.preventDefault();
            clickBtnParagraph();
        }
        // Evaluar si el click fue en el BTN history;
        else if (e.target.matches('button#btnHistory')) {
            e.preventDefault();
            clickBtnPost();
        }
    });

    $form.addEventListener('change', (e) => {
        // Evaluar si existe un cambio en input file.
        if (e.target.matches('input#inputImg')) {
            const file = e.target.files[0];
            // evaluar si existe una img en el input file.
            if (file) {
                const reader = new FileReader();

                reader.addEventListener('load', (e) => {
                    Post.imgData = e.target.result;

                    const img = creatNodo('img', undefined, undefined, 'w-full sm:w-64 float-left rounded overflow-hidden shadow-md mx-auto  sm:mr-4 mb-3');
                    img.setAttribute('src', Post.imgData);

                    // Si no existe parrafo dentro del post agregar como ultimo hijo.
                    if ($('#post').children[1] === undefined) {
                        $('#post').appendChild(img);
                    } else {
                        $('#post').insertBefore(img, $('#post').children[1]);
                    }

                    let $li = $('#progressPost').children[1];
                    addClass($li, ['bg-green-700']);
                    setWalkPost('¡De acuerdo!', 'Tienes que escribir tu gran historia; demuestra tu gran habilidad de escribir :)');



                    // New Form
                    let $fragment = document.createDocumentFragment();
                    let $button = creatNodo('button', "guardar parrafo", 'btnParagraph', 'w-full bg-green-300 text-gray-700 uppercase focus:outline-none rounded shadow-md py-2 px-4 mt-4 mx-auto');
                    let $textarea = creatNodo('textarea', undefined, 'inputParagraph', 'border-solid border-2 border-gray-300 focus:border-green-300 leading-snug rounded mt-1 px-3 py-2');
                    let $div = creatNodo('div', undefined, undefined, 'flex flex-col relative mb-4');
                    $textarea.setAttribute('placeholder', 'Escribir párrafo...')
                    $div.appendChild($textarea);
                    $div.appendChild($button);
                    $fragment.innerHTML = '';
                    $fragment.appendChild($div);

                    setNodo($('#form'), $fragment);
                    $('#inputParagraph').focus();
                });
                reader.readAsDataURL(file);


            }
        }
    });
    $form.addEventListener('keyup', (e) => {
        // Evaluar si existe algun tipo de caracter dentro del input title;
        if (e.target.matches('input') && e.target.id == 'inputTitle' && e.target.value != '') {
            let valor = e.target.value;
            e.target.value = capitalize(valor);
            btnOn($('#btnTitle'));
            inputOn(e.target);

            $('#title').innerText = e.target.value;

        }
        // Evaluar si el input title está vacio;
        else if (e.target.matches('input') && e.target.id == 'inputTitle' && e.target.value === '') {
            $('#title').innerText = 'Nueva Historia';
            btnOff($('#btnTitle'));
        }

        // Evaluar si existe algun tipo de caracter dentro del textarea;
        else if (e.target.matches('textarea#inputParagraph') && e.target.value != '') {
            e.target.value = capitalize(e.target.value);
            e.target.value = dotParagraph(e.target.value);

            if (!document.querySelector('.paragraph')) {
                let $p = creatNodo('p', e.target.value, undefined, 'w-full paragraph text-gray-700 leading-6 mb-2');
                $('#post').appendChild($p);
            }
            else {
                let $paragraph = document.querySelectorAll('.paragraph');
                for (let index = 0; index < $paragraph.length; index++) {
                    let $undefined = index;
                    const $firtParagraph = $paragraph[++$undefined];
                    if ($firtParagraph == undefined) {
                        let content = e.target.value;
                        content = strongParagraph(e.target.value);
                        content = thoroughParagraph(content);
                        content = italicParagraph(content);
                        $paragraph[index].innerHTML = content;
                    }
                }
            }

            btnOn(e.target.parentElement.children[1]);


            if (e.keyCode == 13) {
                clickBtnParagraph();
            }
        }
        // Evaluar si el textarea esta vacio;
        else if (e.target.matches('textarea#inputParagraph') && e.target.value === '') {
            btnOff(e.target.parentElement.children[1]);
        }
    });

    // Event Windonws 
    window.addEventListener('load', (e) => {
        $('#inputTitle').focus();
    })
})();