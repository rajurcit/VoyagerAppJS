using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Xml;

namespace ACLServices
{
    /// <summary>
    /// Summary description for ACLServices
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class ACLServices : System.Web.Services.WebService
    {

        [WebMethod]
        public string AuthenticatePatronService(string lastName, string loginType, string Id)
        {
            string xmldata = "<?xml version='1.0' encoding='UTF - 8'?><ser:serviceParameters xmlns:ser='http://www.endinfosys.com/Voyager/serviceParameters'><ser:parameters><ser:parameter key='pin'><ser:value></ser:value></ser:parameter></ser:parameters> <ser:patronIdentifier lastName='" + lastName + "'><ser:authFactor type='" + loginType + "'>" + Id + "</ser:authFactor></ser:patronIdentifier></ser:serviceParameters>";
            xmldata = xmldata.Replace("'", "\"");
            xmldata = xmldata.Replace(" - ", "-");
            string strResponse = "";
            WebRequest req = null;
            WebResponse rsp = null;
            try
            {
                Stream objStream;
                StreamReader objSR;
                string uri = "http://64.94.37.21:7014/vxws/AuthenticatePatronService";
                XmlTextReader reader = new XmlTextReader("xml/Demo.xml");
                XmlDocument doc = new XmlDocument();
                req = WebRequest.Create(uri);
                //req.Proxy = WebProxy.GetDefaultProxy(); // Enable if using proxy
                req.Method = "POST";        // Post method
                req.ContentType = "text/xml";     // content type Wrap the request stream with a text-based writer
                StreamWriter writer = new StreamWriter(req.GetRequestStream());
                // Write the XML text into the stream
                writer.WriteLine(xmldata);
                writer.Close();
                rsp = req.GetResponse();

                objStream = rsp.GetResponseStream();
                objSR = new StreamReader(objStream, true);
                strResponse = objSR.ReadToEnd();
                //  strResponse= JsonConvert.SerializeObject(strResponse, Newtonsoft.Json.Formatting.Indented);

                //  strResponse = JsonConvert.SerializeXmlNode(strResponse); 
                // XmlDocument doc = JsonConvert.DeserializeXmlNode(json);

            }
            catch (WebException webEx)
            {

            }
            catch (Exception ex)
            {

            }
            finally
            {

            }
            return strResponse;
        }
    }
}
