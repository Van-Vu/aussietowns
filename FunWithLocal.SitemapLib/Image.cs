using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace FunWithLocal.SitemapLib
{
    [Serializable]
    [XmlType("image")]
    public class Image
    {
        [XmlElement(ElementName = "loc")]
        public string Url { get; set; }

        //[XmlNamespaceDeclarations]
        //public XmlSerializerNamespaces NameSpace
        //{
        //    get
        //    {
        //        XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
        //        ns.Add("image", "http://www.google.com/schemas/sitemap-image/1.1");
        //        return ns;
        //    }
        //    set { NameSpace = value; }
        //}
    }
}
