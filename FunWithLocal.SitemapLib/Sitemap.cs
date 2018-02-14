using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace FunWithLocal.SitemapLib
{
    [Serializable]
    [XmlRoot(ElementName = "urlset")]
    public class Sitemap
    {
        [XmlNamespaceDeclarations]
        public XmlSerializerNamespaces NameSpace
        {
            get
            {
                XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
                ns.Add("", "http://www.sitemaps.org/schemas/sitemap/0.9");
                ns.Add("image", "http://www.google.com/schemas/sitemap-image/1.1");

                return ns;
            }
            set { NameSpace = value; }
        }

        [XmlElement("url")]
        public List<Url> Urls { get; set; }
    }


    /// <summary>
    /// Subclass the StringWriter class and override the default encoding.  
    /// This allows us to produce XML encoded as UTF-8. 
    /// </summary>
    public class StringWriterUtf8 : StringWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
    }

}
