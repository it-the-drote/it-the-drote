
/*
 * GET home page.
 */
var fs = require('fs'), http = require('http'), md = require('marked'), gamedata = '', trackinfo = '';
var renderer = new md.Renderer();

renderer.heading = function (text, level) {
	var escapedText = text.toLowerCase().replace(/[^\wА-яЁёЇїІіЄє]+/g, '-');
	return '<h' + level + '><a name="' +
				escapedText +
				'" class="anchor" href="#' +
				escapedText +
				'"><span class="header-link"></span></a>' +
				text + '</h' + level + '>';
}

md.setOptions({
	renderer: renderer,
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});


exports.index = function(req, res){
	var title = "In the middle of nowhere"
	http.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=like-all&api_key=f4ba050b95c9cd5dad4f5187349fe89d&format=json&limit=1', function(apirespond){
		apirespond.setEncoding('utf8');
		apirespond.on('data', function(chunk){
			trackinfo = trackinfo + chunk;
		});
		apirespond.on('end', function(){
			var result = JSON.parse(trackinfo);
			if (Object.prototype.toString.call(result.recenttracks.track) === '[object Array]')
				var artist = result.recenttracks.track[0].artist['#text'],
					song = result.recenttracks.track[0].name,
					songurl = result.recenttracks.track[0].url;
			else
				var artist = result.recenttracks.track.artist['#text'],
					song = result.recenttracks.track.name,
					songurl = result.recenttracks.track.url;
			//console.log(artist + ' ' + song + '\n' + result + '\n' + trackinfo);
			res.render('index', { music: artist + ' - ' + song, url: songurl, caption: title });
			trackinfo ='';
		});
	});
};

exports.articles = function(req, res){
	var title = "Статьи и заметки(вместо блога)"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/articles.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/articles.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('articles', { md:md, mdContent:data.toString(), caption: title });
	});
};

exports.dreams = function(req, res){
	var title = "Сновидения"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/dreams.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/dreams.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('dreams', { md:md, mdContent:data.toString(), caption: title });
	});
};

exports.projects = function(req, res){
	var title = "Проекты"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/projects.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/projects.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('projects', { md:md, mdContent:data.toString(), caption: title });
	});
};

exports.article = function(req, res){
	var title = fs.readFileSync('/home/apps/it-the-drote/markdown-content/articles/' + req.params.id + '.md', { encoding: 'utf8' }).split('\n')[0];
	fs.readFile('/home/apps/it-the-drote/markdown-content/articles/' + req.params.id + '.md', function(err, data){
		if(err)
			res.render('404');
		else
			moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/articles/' + req.params.id + '.md').mtime;
			res.set('Last-Modified', moddate);
			res.render('articles', { md:md, mdContent:data.toString(), caption: title });
	});
};

exports.dream = function(req, res){
	var title = fs.readFileSync('/home/apps/it-the-drote/markdown-content/dreams/' + req.params.id + '.md', { encoding: 'utf8' }).split('\n')[0];
	fs.readFile('/home/apps/it-the-drote/markdown-content/dreams/' + req.params.id + '.md', function(err, data){
		if(err)
			res.render('404');
		else
			moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/dreams/' + req.params.id + '.md').mtime;
			res.set('Last-Modified', moddate);
			res.render('dreams', { md:md, mdContent:data.toString(), caption: title });
	});
};

exports.project = function(req, res){
	var title = fs.readFileSync('/home/apps/it-the-drote/markdown-content/projects/' + req.params.id + '.md', { encoding: 'utf8' }).split('\n')[0];
	fs.readFile('/home/apps/it-the-drote/markdown-content/projects/' + req.params.id + '.md', function(err, data){
		if(err)
			res.render('404');
		else
			moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/projects/' + req.params.id + '.md').mtime;
			res.set('Last-Modified', moddate);
			res.render('projects', { md:md, mdContent:data.toString(), caption: title });
	});
};

exports.about = function(req, res){
	var title = "Обо мне"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/about.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/about.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('about', { md:md, mdContent:data.toString(), caption: title });
	});
};

exports.cv = function(req, res){
	var title = "Резюме"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/cv.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/cv.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('cv', { md:md, mdContent:data.toString(), caption: title });
	});
};


exports.donate = function(req, res){
	res.render('donate');
};

exports.ogame = function(req, res){
	fs.readFile('/tmp/ogame.json', function(err, data){
		if(err) throw err;
		gamedata = eval('(' + data + ')');
	});
	res.render('ogame', {metal: gamedata.metal, crystal: gamedata.crystal, deuterium: gamedata.deuterium, darkmatter: gamedata.darkmatter, energy: gamedata.energy});
}
