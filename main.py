import os, os.path
import cherrypy
import ContactDAO
from ContactWebService import ContactWebService

class ContactBook(object):
    @cherrypy.expose
    def index(self):
        return open('./public/index.html')

if __name__ == '__main__':
    conf = {
        '/' : {
            'tools.sessions.on' : True,
            'tools.staticdir.root' : os.path.abspath(os.getcwd())
        },
        '/static' : {
            'tools.staticdir.on' : True,
            'tools.staticdir.dir' : './public/dist'
        },
        '/contacts' : {
            'tools.response_headers.on' : True,
            'tools.response_headers.headers' : [('Content-Type', 'application/json')],
            'request.dispatch' : cherrypy.dispatch.MethodDispatcher()
        }
    }

    cherrypy.engine.subscribe('start', ContactDAO.setup_database)
    cherrypy.engine.subscribe('stop', ContactDAO.cleanup_database)

    webapp = ContactBook()
    webapp.contacts = ContactWebService()
    cherrypy.quickstart(webapp, '/', conf)