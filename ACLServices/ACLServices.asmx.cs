using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
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

        [WebMethod]
        public string Mysearches(string lastName, string loginType, string patronHomeUbId, string patronId, string Id)
        {
            string xmldata = "<?xml version='1.0' encoding='UTF-8'?><ser:serviceParameters xmlns:ser='http://www.endinfosys.com/Voyager/serviceParameters'><ser:parameters><ser:parameter key='action'><ser:value>delete</ser:value></ser:parameter><ser:parameter key='savedSearchIds'><ser:value>354</ser:value></ser:parameter></ser:parameters><ser:patronIdentifier lastName='" + lastName + "' patronHomeUbId='" + patronHomeUbId + "' patronId='" + patronId + "'><ser:authFactor type='" + loginType + "'>" + Id + "</ser:authFactor></ser:patronIdentifier></ser:serviceParameters>";
            xmldata = xmldata.Replace("'", "\"");
            xmldata = xmldata.Replace(" - ", "-");
            string strResponse = "";
            WebRequest req = null;
            WebResponse rsp = null;
            try
            {
                Stream objStream;
                StreamReader objSR;
                string uri = "http://64.94.37.21:7014/vxws/SavedQueriesService";
                req = WebRequest.Create(uri);
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

        [WebMethod]
        public string SearchPropertiesService(string clientIP)
        {
            clientIP = "203.115.101.198";
            string xmldata = "<?xml version='1.0' encoding='UTF - 8'?><ser:serviceParameters xmlns:ser='http://www.endinfosys.com/Voyager/serviceParameters'><ser:parameters><ser:parameter key='clientIP'><ser:value>" + clientIP + "</ser:value></ser:parameter></ser:parameters></ser:serviceParameters>";
            xmldata = xmldata.Replace("'", "\"");
            xmldata = xmldata.Replace(" - ", "-");
            string strResponse = "";
            WebRequest req = null;
            WebResponse rsp = null;
            try
            {
                Stream objStream;
                StreamReader objSR;
                string uri = "http://64.94.37.21:7014/vxws/SearchPropertiesService";
                req = WebRequest.Create(uri);
                req.Method = "POST";
                req.ContentType = "text/xml";     // content type Wrap the request stream with a text-based writer
                StreamWriter writer = new StreamWriter(req.GetRequestStream());
                // Write the XML text into the stream
                writer.WriteLine(xmldata);
                writer.Close();
                rsp = req.GetResponse();

                objStream = rsp.GetResponseStream();
                objSR = new StreamReader(objStream, true);
                strResponse = objSR.ReadToEnd();
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

        [WebMethod]
        public string test()
        {
            var webAddr = "http://staging.sirez.com/EMS/api/EMS/PostNewTicket";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(webAddr);
            httpWebRequest.ContentType = "application/json; charset=utf-8";
            httpWebRequest.Method = "POST";
            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{'CustomerName': 'Narendr Kumar', 'CustomerPhoneNo': '231234561', 'CustomerAlternateNo': '123223345','Source': '1','EmailID': '', 'TourName': '', 'StartDate': '', 'EndDate': '', 'IsPredefinedDates': '0', 'ExpectedDate': '07/01/2017','NoOfDays': 5,'NoOfAdult': 2, 'NoOfChild': 1,'NoOfInfant': 0,'PickupPoint': '','PickiupDate': '', 'PickiupTime': '','PickupDetails': '','DropPoint': '','DropDate': '','DropTime': '', 'DropDetails': '','UserName': 'admin', 'BranchCode': 'DEL0001'}";
                streamWriter.Write(json);
                streamWriter.Flush();
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                JavaScriptSerializer json = new JavaScriptSerializer();
                var data = json.DeserializeObject(result);

                return result;
            }

        }
    }
}
