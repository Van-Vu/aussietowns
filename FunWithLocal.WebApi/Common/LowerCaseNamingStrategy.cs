﻿using Newtonsoft.Json.Serialization;

namespace AussieTowns.Common
{
    public class LowerCaseNamingStrategy : NamingStrategy
    {
        /// <summary>
        /// Resolves the specified property name.
        /// 
        /// </summary>
        /// <param name="name">The property name to resolve.</param>
        /// <returns>
        /// The resolved property name.
        /// </returns>
        protected override string ResolvePropertyName(string name)
        {
            return name.ToLower();
        }
    }
}