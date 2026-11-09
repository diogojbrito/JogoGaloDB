// Service Worker do Jogo do Galo
// Guarda os ficheiros no telemóvel/computador para o jogo funcionar sem internet.

// Nome da "gaveta" onde guardamos os ficheiros.
// Se alterares algum ficheiro do jogo, muda o número (v1 -> v2) para atualizar.
const CACHE_NOME = 'jogo-do-galo-v1';

// Lista dos ficheiros que queremos guardar
const FICHEIROS = [
    './',
    './index.html',
    './css/style.css',
    './js/game.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// 1) INSTALAR: guarda todos os ficheiros da lista
self.addEventListener('install', function (evento) {
    evento.waitUntil(
        caches.open(CACHE_NOME).then(function (cache) {
            return cache.addAll(FICHEIROS);
        })
    );
});

// 2) ATIVAR: apaga versões antigas da cache
self.addEventListener('activate', function (evento) {
    evento.waitUntil(
        caches.keys().then(function (nomes) {
            return Promise.all(
                nomes
                    .filter(function (nome) { return nome !== CACHE_NOME; })
                    .map(function (nome) { return caches.delete(nome); })
            );
        })
    );
});

// 3) PEDIDOS: primeiro procura na cache; se não encontrar, vai à internet
self.addEventListener('fetch', function (evento) {
    evento.respondWith(
        caches.match(evento.request).then(function (resposta) {
            return resposta || fetch(evento.request);
        })
    );
});
