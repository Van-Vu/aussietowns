using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace FunWithLocal.SitemapGenerator
{
    [Serializable]
    public enum ChangeFrequency
    {
        [XmlEnum(Name = "always")]
        Always,

        [XmlEnum(Name = "hourly")]
        Hourly,

        [XmlEnum(Name = "daily")]
        Daily,

        [XmlEnum(Name = "weekly")]
        Weekly,

        [XmlEnum(Name = "monthly")]
        Monthly,

        [XmlEnum(Name = "yearly")]
        Yearly,

        [XmlEnum(Name = "never")]
        Never
    }
}
