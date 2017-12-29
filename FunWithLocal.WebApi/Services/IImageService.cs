using System.Threading.Tasks;
using FunWithLocal.WebApi.Model;
using Microsoft.AspNetCore.Http;

namespace FunWithLocal.WebApi.Services
{
    public interface IImageService
    {
        Task<Image> InsertListingImage(int listingId, IFormFile file);
        Task<string> InsertProfileImage(int profileId, IFormFile file);
        Task<string> InsertHeroImage(int profileId, IFormFile file);
        Task<Image> FetchImageByUrl(int listingId, string url);
        Task<string> InsertArticleImage(int articleId, IFormFile file);
        Task<int> DeleteImage(int imageId);

    }
}
