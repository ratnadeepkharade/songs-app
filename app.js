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

// code to add 1st song in songs list without looping
var SongItem = pakka.create({
    name: 'song-item',
    html: '<li class="list-group-item" bind-text="name"></li>',
    css: '',
    controller: function(context) {
        context.$set('name', 'My song 2')
    }
});

SongApp.$set('songItemComponent', SongItem);

// array to hold song item components
var songItemComponentList = [];
function init(){
    songs.forEach(function(song){
        var SongItem = pakka.create({
            name: 'song-item',
            html: '<li class="list-group-item" bind-text="name"></li>',
            css: '',
            controller: function(context) {
                context.$set('name', song.name);
            }
        });

        songItemComponentList.push(SongItem);
    });

    SongApp.$set('songItemComponentList', songItemComponentList);

}

init();