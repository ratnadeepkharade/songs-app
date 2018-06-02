// create initial app component
var SongApp = pakka.create('.songApp');

// songs list array
var songs = [
    {   
        id: 1,
        name: 'song 1',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   
        id: 2,
        name: 'song 2',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   
        id: 3,
        name: 'song 3',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   
        id: 4,
        name: 'song 4',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },

];

// // code to add 1st song in songs list without looping
// var SongItem = pakka.create({
//     name: 'song-item',
//     html: '<li class="list-group-item" bind-text="name"></li>',
//     css: '.list-group-item:hover{background-color:#eee}',
//     controller: function(context) {
//         context.$set('name', 'My song 2')
//     }
// });
// SongApp.$set('songItemComponent', SongItem);






// array to hold song item components
var songItemComponentList = [];

//set initial selected song to 1st song in array
var selectedSong = songs[0];





// init function creates initial list of songs
function init() {
    songs.forEach(function (song, index) {
        songItemComponentList.push(createSongItemComponent(song, index));
    });

    SongApp.$set('songItemComponentList', songItemComponentList);

    
    SongApp.$set('songDetailsComponent', createSongDetailsComponent(selectedSong, 0));

}
init();

// function returns new song item component
function createSongItemComponent(song, index) {
    var SongItem = pakka.create({
        name: 'song-item',
        html: '<li class="list-group-item" bind-text="name" click-handle="clicked"></li>',
        css: '.list-group-item:hover{background-color:#eee; cursor:pointer}',
        controller: function (context) {

            context.$set('songObj', song);
            context.$set('name', song.name);

            context.clicked = function(event){
                selectedSong = context.$get('songObj');;
                addSongToDetails(selectedSong, index);
            }
        }
    });

    return SongItem;
}

// function attaches songs list to DOM
function addSongToList(SongItem) {
    songItemComponentList.push(SongItem);
    SongApp.$set('songItemComponentList', songItemComponentList);
}

// function attaches song details component to DOM
function addSongToDetails(song, index){
    SongApp.$set('songDetailsComponent', createSongDetailsComponent(song, index));
}


// function returns new song details component
function createSongDetailsComponent(song, index) {
    var SongDetailsComponent = pakka.create({
        name: 'song-details-component',
        html: `<h5 class="card-title">Name :  <span bind-text="name"></span></h5>
           <h6 class="card-subtitle mb-2 text-muted">Song Album</h6>
           <p class="card-text"><span bind-text="album"></span> </p>
           <h6 class="card-subtitle mb-2 text-muted">Singers</h6>
           <p class="card-text"> <span bind-text="singers"></span>  </p>`,
        css: '',
        controller: function (context) {
            context.$set('name', selectedSong.name);

            context.$set('album', selectedSong.album);
            //console.log(selectedSong.singers);
            context.$set('singers', selectedSong.singers.join(', '));
        }
    });

    return SongDetailsComponent;
}