// create initial app component
var SongApp = pakka.create('.songApp');

SongApp.showAddElement = false;

//SongApp.$set('hidden', {'hidden1': SongApp.showAddElement});

SongApp.addSong = function(event) {
    event.preventDefault();
    SongApp.showAddElement = !SongApp.showAddElement;

    addSongToAddComponent();
}

// songs list array
var songs = [
    {   
        name: 'song 1',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   
        name: 'song 2',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   
        name: 'song 3',
        album: 'album 1',
        singers: ['singer 1', 'singer 2', 'singer 3']
    },
    {   
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

    //SongApp.$set('addSongComponent', addSongToAddComponent());

}
init();

// function returns new song item component
function createSongItemComponent(song, index) {
    var SongItem = pakka.create({
        name: 'song-item',
        html: `<li class="list-group-item song-wrapper" click-handle="songClicked"><span bind-text="name"></span> <span class="delete" click-handle="deleteClicked">X</span> </li>`,
        css: `.list-group-item:hover{background-color:#eee; cursor:pointer}
                .song-wrapper{position:relative} .delete{position:absolute; right: 15px; top: 10px;} .delete:hover{font-weight:bold;}`,
        controller: function (context) {

            context.$set('songObj', song);
            context.$set('name', song.name);

            context.$set('id', index);

            context.songClicked = function(event){
                event.preventDefault();
                selectedSong = context.$get('songObj');
                addSongToDetails(selectedSong, index);
            }

            context.deleteClicked = function(event){
                event.stopPropagation();
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

// function attaches song details component to DOM
function addSongToDetails(song, index){
    SongApp.$set('songDetailsComponent', createSongDetailsComponent(song, index));
}

// function returns add song  component
function createAddSongComponent() {
    var AddSongComponent = pakka.create({
        name: 'add-song-component',
        html: `<div class="row" id="add-song-form-wrapper">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">Add Song</h5>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group row">
                                        <label for="songName" class="col-sm-2 col-form-label">Song Name:</label>
                                        <div class="col-sm-10">
                                            <input bind-property="songModel" type="text" class="form-control" id="songName" placeholder="Enter Song Name">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="albumName" class="col-sm-2 col-form-label">Album Name:</label>
                                        <div class="col-sm-10">
                                            <input bind-property="albumModel" type="text" class="form-control" id="albumName" placeholder="Enter Album Name">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="singersNames" class="col-sm-2 col-form-label">Singers:</label>
                                        <div class="col-sm-10">
                                            <input bind-property="singersModel" type="text" class="form-control" id="singersNames" placeholder="Enter Singers">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <button type="button" class="btn btn-outline-danger mb-2 float-right" click-handle="cancelClicked">Cancel</button>
                                            <button type="button" class="btn btn-outline-primary mb-2 float-left" click-handle="saveClicked">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`,
        css: '',
        controller: function (context) {
            context.cancelClicked = function(event){
                AddSongComponent.$destroy();
            }

            context.saveClicked = function(event){
                var songModel = context.$get('songModel');
                var albumModel = context.$get('albumModel') || '';
                var singersModel = context.$get('singersModel') || '';

                if(!songModel || songModel.trim() === ''){
                    return;
                }

                var songObj = {
                    name: songModel,
                    album: albumModel,
                    singers: singersModel.split(',')
                }

                songs.push(songObj);
                
                songItemComponentList.push(createSongItemComponent(songObj, songs.length));

                SongApp.$set('songItemComponentList', songItemComponentList);

                AddSongComponent.$destroy();
            }
        }
    });

    return AddSongComponent;
}
var AddSongComponent;
// function attaches song details component to DOM
function addSongToAddComponent(){
    AddSongComponent = createAddSongComponent()
    SongApp.$set('addSongComponent', AddSongComponent);
}