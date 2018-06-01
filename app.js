var SongApp = pakka.create('.songApp');

var songs = [
    {   name: 'song 1',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   name: 'song 2',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   name: 'song 3',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   name: 'song 4',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },

];

var SongItem = pakka({
    name: 'song-item',
    html: '<li class="list-group-item" bind-text="name"></li>',
    css: '',
    controller: function(context) {
        context.$set('name', 'song 2')
    }
});

SongApp.$set('songItemComponent', new SongItem());


function init(){
    songs.forEach(function(song){

    });
}