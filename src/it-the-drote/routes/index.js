
/*
 * GET home page.
 */
var fs = require('fs'), http = require('http'), md = require('marked'), gamedata = '', trackinfo = '';
var env = require('/usr/lib/apps-environment/javascript/getenvironment.js').getEnv();
var pkgver = require('/opt/it-the-drote/public/version.json').version;
var renderer = new md.Renderer();
var hostname = '';

if(env == 'development') {
	hostname = 'dev.it-the-drote.tk';
} else {
	hostname = 'it-the-drote.tk';
}

renderer.heading = function (text, level) {
	var escapedText = text.toLowerCase().replace(/[^\wА-яЁёЇїІіЄє]+/g, '-');
	return '<h' + level + '>' + text + ' <a name="' +
				escapedText +
				'" class="anchor section" href="#' +
				escapedText +
				'"><span class="header-link">§</span></a>' +
				'</h' + level + '>';
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

var pageSettings = {
	caption: '',
	md: undefined,
	mdContent: undefined,
	host: hostname,
	environment: env,
	version: pkgver
}

exports.index = function(req, res){
	pageSettings.caption = "In the middle of nowhere"
	res.render('index', pageSettings);
};

exports.articles = function(req, res){
	pageSettings.caption = "Статьи и заметки(вместо блога)"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/articles.md', function(err, data){
		if(err) throw err;
		pageSettings.md = md;
		pageSettings.mdContent = data.toString();
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/articles.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('articles', pageSettings);
	});
};

exports.dreams = function(req, res){
	pageSettings.caption = "Сновидения"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/dreams.md', function(err, data){
		if(err) throw err;
		pageSettings.md = md;
		pageSettings.mdContent = data.toString();
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/dreams.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('dreams', pageSettings);
	});
};

exports.projects = function(req, res){
	pageSettings.caption = "Проекты"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/projects.md', function(err, data){
		if(err) throw err;
		pageSettings.md = md;
		pageSettings.mdContent = data.toString();
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/projects.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('projects', pageSettings);
	});
};

exports.article = function(req, res){
	fs.readFile('/home/apps/it-the-drote/markdown-content/articles/' + req.params.id + '.md', function(err, data){
		if(err) {
			res.status(404);
			res.render('404', pageSettings);
		} else {
			pageSettings.caption = fs.readFileSync('/home/apps/it-the-drote/markdown-content/articles/' + req.params.id + '.md', { encoding: 'utf8' }).split('\n')[0];
			pageSettings.md = md;
			pageSettings.mdContent = data.toString();
			moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/articles/' + req.params.id + '.md').mtime;
			res.set('Last-Modified', moddate);
			res.render('articles', pageSettings);
		}
	});
};

exports.dream = function(req, res){
	fs.readFile('/home/apps/it-the-drote/markdown-content/dreams/' + req.params.id + '.md', function(err, data){
		if(err) {
			res.status(404);
			res.render('404', pageSettings);
		} else {
			pageSettings.caption = fs.readFileSync('/home/apps/it-the-drote/markdown-content/dreams/' + req.params.id + '.md', { encoding: 'utf8' }).split('\n')[0];
			pageSettings.md = md;
			pageSettings.mdContent = data.toString();
			moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/dreams/' + req.params.id + '.md').mtime;
			res.set('Last-Modified', moddate);
			res.render('dreams', pageSettings);
		}
	});
};

exports.project = function(req, res){
	fs.readFile('/home/apps/it-the-drote/markdown-content/projects/' + req.params.id + '.md', function(err, data){
		if(err) {
			res.status(404);
			res.render('404', pageSettings);
		} else {
			var pageSettings.caption = fs.readFileSync('/home/apps/it-the-drote/markdown-content/projects/' + req.params.id + '.md', { encoding: 'utf8' }).split('\n')[0];
			pageSettings.md = md;
			pageSettings.mdContent = data.toString();
			moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/projects/' + req.params.id + '.md').mtime;
			res.set('Last-Modified', moddate);
			res.render('projects', pageSettings);
		}
	});
};

exports.about = function(req, res){
	pageSettings.caption = "Обо мне"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/about.md', function(err, data){
		if(err) throw err;
		pageSettings.md = md;
		pageSettings.mdContent = data.toString();
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/about.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('about', pageSettings);
	});
};

exports.cv = function(req, res){
	pageSettings.caption = "Резюме"
	fs.readFile('/home/apps/it-the-drote/markdown-content/static/cv.md', function(err, data){
		if(err) throw err;
		pageSettings.md = md;
		pageSettings.mdContent = data.toString();
		moddate = fs.statSync('/home/apps/it-the-drote/markdown-content/static/cv.md').mtime;
		res.set('Last-Modified', moddate);
		res.render('cv', pageSettings);
	});
};

exports.ping = function(req, res){
	res.send("OK");
}


exports.donate = function(req, res){
	res.render('donate');
};
