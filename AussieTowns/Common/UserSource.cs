using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient.Authentication;

namespace AussieTowns.Common
{
    public enum UserSource
    {
        Native,
        Facebook,
        Google
    }
}
