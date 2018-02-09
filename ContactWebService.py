import json
import cherrypy
import ContactDAO
from Contact import Contact

@cherrypy.expose
class ContactWebService(object):
    @cherrypy.tools.accept(media='application/json')
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self):
        response = None
        req_obj = dict(cherrypy.request.json)
        contact = Contact(req_obj['name'], req_obj['group'], req_obj['email'], req_obj['phone'])
        if contact.validate():
            try:
                ContactDAO.save_conatct(contact)
                response = {"msg": "Success"}
            except Exception as ex:
                cherrypy.response.status = "500"
                response = {"msg" : ex.message }
        else:
            cherrypy.response.status = "400"
            response = {"msg" : "validation error"}
        return response

    @cherrypy.tools.json_out()
    def GET(self):
        try:
            result = ContactDAO.fetch_all()
        except Exception as ex:
            cherrypy.response.status = "500"
            result = {"msg" : ex.message }
        return result
