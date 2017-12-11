namespace FunWithLocal.WebApi.Model
{
    public class Image
    {
        public int ImageId { get; set; }
        public int ListingId { get; set; }
        public string Url { get; set; }
        public int SortOrder { get; set; }
        public bool IsActive { get; set; }
        public int UserId { get; set; }

        public Image()
        {
            
        }
    }
}
