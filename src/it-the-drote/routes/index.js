
/*
 * GET home page.
 */
var fs = require('fs'), http = require('http'), md = require('marked'), gamedata = '', trackinfo = '';
var env = require('/usr/lib/apps-environment/javascript/getenvironment.js').getEnv();
var renderer = new md.Renderer();
var hostname = '';

if(env == 'development') {
	hostname = 'dev.it-the-drote.tk';
} else {
	hostname = 'it-the-drote.tk';
}

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
	res.render('index', { caption: title, host: hostname, environment: env });
};

exports.articles = function(req, res){
	var title = "Статьи и заметки(вместо блога)"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/articles.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/articles.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('articles', { md:md, mdContent:data.toString(), caption: title, environment: env });
	});
};

exports.dreams = function(req, res){
	var title = "Сновидения"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/dreams.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/dreams.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('dreams', { md:md, mdContent:data.toString(), caption: title, environment: env });
	});
};

exports.projects = function(req, res){
	var title = "Проекты"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/projects.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/projects.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('projects', { md:md, mdContent:data.toString(), caption: title, environment: env });
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
			res.render('articles', { md:md, mdContent:data.toString(), caption: title, environment: env });
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
			res.render('dreams', { md:md, mdContent:data.toString(), caption: title, environment: env });
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
			res.render('projects', { md:md, mdContent:data.toString(), caption: title, environment: env });
	});
};

exports.about = function(req, res){
	var title = "Обо мне"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/about.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/about.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('about', { md:md, mdContent:data.toString(), caption: title, environment: env });
	});
};

exports.cv = function(req, res){
	var title = "Резюме"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/cv.md', function(err, data){
		if(err) throw err;
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/cv.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('cv', { md:md, mdContent:data.toString(), caption: title, environment: env });
	});
};

exports.ping = function(req, res){
	res.send("OK");
}


exports.donate = function(req, res){
	res.render('donate');
};
