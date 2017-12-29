using System.Threading.Tasks;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Repository
{
    public interface IImageRepository
    {
        Task<int> InsertListingImage(int listingId, string url);
        Task<int> InsertProfileImage(int profileId, string url);
        Task<int> InsertHeroImage(int profileId, string url);
        Task<int> InsertArticleImage(int articleId, string url);
        Task<Image> GetImageByUrl(int listingId, string url);
        Task<int> DeleteImage(int imageId);

    }
}
