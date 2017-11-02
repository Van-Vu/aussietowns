using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
  //    id int(11) NOT NULL auto_increment,
  //listingid int NOT NULL,
  //fromAddress varchar(128) NOT NULL,
  //toAddress varchar(128) NOT NULL,
  //subject varchar(200) NOT NULL,
  //content varchar(1000) NOT NULL,
  //transactionId varchar(36),
  //messageId varchar(36),
  //status bit DEFAULT 0,
  //createdDate DATETIME,

    public class EmailLog
    {
        public int Id { get; set; }
        public int ListingId { get; set; }
        public string FromAddress { get; set; }
        public string ToAddress { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string TransactionId { get; set; }
        public string MessageId { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
