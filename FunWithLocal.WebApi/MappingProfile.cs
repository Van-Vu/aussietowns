using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using AussieTowns.Model;
using AutoMapper;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using Newtonsoft.Json;

namespace FunWithLocal.WebApi
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<User, MiniProfile>()
                .ForMember(dest => dest.Fullname, opts => opts.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(src => "/static/images/anonymous.png"))
                .ForMember(dest => dest.ShortDescription, opts => opts.MapFrom(src => src.Description.PadLeft(30)));

            CreateMap<User, UserLoggedIn>()
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(src => src.Images.Any() ? src.Images.FirstOrDefault().Url : "/static/images/anonymous.png"));

            CreateMap<SuburbDetail, AutoCompleteItem>()
                .ForMember(dest => dest.Name,
                    opts => opts.MapFrom(src => $"{src.SuburbName}, {src.State} ({src.Postcode})"));

            CreateMap<User, AutoCompleteItem>()
                .ForMember(dest => dest.Name,
                    opts => opts.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.ImageUrl, opts => opts.MapFrom(src => "/static/images/anonymous.png"));

            CreateMap<Listing, ListingSummary>()
                .ForMember(dest => dest.Location,
                    opts => opts.MapFrom(src => $"{src.Location.SuburbName}, {src.Location.State} ({src.Location.Postcode})"))
                .ForMember(dest => dest.PrimaryOwner,
                    opts => opts.MapFrom(src => src.TourOperators.Any(x => x.IsPrimary) ? src.TourOperators.SingleOrDefault(x => x.IsPrimary).User.FirstName : string.Empty))
                .ForMember(dest => dest.MinParticipant,
                    opts => opts.MapFrom(src => src.Type == ListingType.Offer ? src.MinParticipant : src.TourGuests.Count));

            CreateMap<ListingView, ListingSummary>()
                .ForMember(dest => dest.Location,
                    opts => opts.MapFrom(src => $"{src.SuburbName} ({src.PostCode})"))
                .ForMember(dest => dest.PrimaryOwner,
                    opts => opts.MapFrom(src => src.OwnerName))
                .ForMember(dest => dest.MinParticipant,
                    opts => opts.MapFrom(src => src.MinParticipant))
                .ForMember(dest => dest.Description,
                    opts => opts.MapFrom(src => src.Description.Substring(0, Math.Min(src.Description.Length, 160))))
                .ForMember(dest => dest.Header,
                    opts => opts.MapFrom(src => src.Header.Substring(0, Math.Min(src.Header.Length, 55)) + " ..."))
                .ForMember(dest => dest.SeoUrl,
                    opts => opts.ResolveUsing<ListingSeoUrlResolver>())
                .ForMember(dest => dest.Schedules,
                    opts => opts.MapFrom(src => JsonConvert.DeserializeObject<IEnumerable<Schedule>>(src.Schedules)));

            CreateMap<Schedule, ScheduleResponse>()
                .ForMember(dest => dest.StartDate, opts => opts.MapFrom(src => src.StartDate.Date.ToString("yyyy/MM/dd")))
                .ForMember(dest => dest.StartTime, opts => opts.MapFrom(src => src.StartDate.TimeOfDay.ToString(@"hh\:mm")))
                .ForMember(dest => dest.Duration,
                    opts => opts.MapFrom(src => src.Duration.ToString(@"hh\:mm")))
                .ForMember(dest => dest.EndDate,
                    opts => opts.MapFrom(src => src.EndDate.HasValue ? src.EndDate.Value.Date.ToString("yyyy/MM/dd") : string.Empty));

            CreateMap<Listing, ListingResponse>()
                .ForMember(dest => dest.LocationDetail,
                    opts => opts.MapFrom(src => Mapper.Map<SuburbDetail, AutoCompleteItem>(src.Location)))
                .ForMember(dest => dest.Schedules,
                    opts => opts.MapFrom(src => src.Schedules.Select(Mapper.Map<Schedule, ScheduleResponse>)))
                .ForMember(dest => dest.TourOperators,
                    opts => opts.ResolveUsing<TourOperatorResolver>())
                .ForMember(dest => dest.BookingSlots,
                    opts => opts.MapFrom(src => src.BookingSlots != null ? src.BookingSlots.Select(Mapper.Map<BookingSlot, BookingSlotResponse>) : null));

            CreateMap<User, UserResponse>()
                .ForMember(dest => dest.LocationDetail,
                    opts => opts.MapFrom(src => Mapper.Map<SuburbDetail, AutoCompleteItem>(src.Location)))
                .ForMember(dest => dest.Hobbies,
                    opts => opts.MapFrom(src => string.IsNullOrEmpty(src.Hobbies) ? new List<string>().ToArray() : src.Hobbies.Split(new[] { ',' }) ))
                .ForMember(dest => dest.OperatorListings,
                    opts => opts.MapFrom(src => src.OperatorListings.Select(Mapper.Map<ListingView, ListingSummary>)))
                .ForMember(dest => dest.GuestListings,
                    opts => opts.MapFrom(src => src.GuestListings.Select( Mapper.Map<ListingView, ListingSummary>)));

            CreateMap<BookingSlot, BookingSlotResponse>()
                .ForMember(dest => dest.BookingDate,
                    opts => opts.MapFrom(src => src.BookingDate.Date.ToString("yyyy/MM/dd")))
                .ForMember(dest => dest.StartTime,
                    opts => opts.MapFrom(src => src.StartTime.ToString(@"hh\:mm")));

            CreateMap<Article, ArticleResponse>()
                .ForMember(dest => dest.Author,
                    opts => opts.MapFrom(src => Mapper.Map<User, MiniProfile>(src.Author)))
                .ForMember(dest => dest.SanitizedContent,
                    opts => opts.MapFrom(src => src.SanitizedContent.Substring(0, Math.Min(src.SanitizedContent.Length, 150))))
                .ForMember(dest => dest.UpdatedDate,
                    opts => opts.MapFrom(src => src.UpdatedDate.ToString("hh:mm dd MMMM yyyy")));

            CreateMap<Article, ArticleCard>()
                .ForMember(dest => dest.PrimaryOwner,
                    opts => opts.MapFrom(src => $"{src.Author.FirstName} {src.Author.LastName}"))
                .ForMember(dest => dest.Description,
                    opts => opts.MapFrom(src => src.Content.Substring(0, Math.Min(src.Content.Length, 160))))
                .ForMember(dest => dest.Header,
                    opts => opts.MapFrom(src => src.Title.Substring(0, Math.Min(src.Title.Length, 55)) + " ..."))
                .ForMember(dest => dest.SeoUrl,
                    opts => opts.ResolveUsing<ArticleSeoUrlResolver>())
                .ForMember(dest => dest.ImageUrls,
                    opts => opts.MapFrom(src => src.ImageUrl));
        }
    }

    public class TourGuestResolver : IValueResolver<Listing, ListingResponse, ICollection<MiniProfile>>
    {
        public ICollection<MiniProfile> Resolve(Listing source, ListingResponse dest, ICollection<MiniProfile> miniProfiles, ResolutionContext context)
        {
            var profiles = new List<MiniProfile>();

            foreach (var tourGuest in source.TourGuests)
            {
                if (tourGuest.ExistingUserId > 0)
                {
                    if (tourGuest.User != null) profiles.Add(Mapper.Map<User, MiniProfile>(tourGuest.User));
                }
                else
                {
                    profiles.Add(new MiniProfile
                    {
                        Id = 0,
                        Email = tourGuest.Email,
                        Fullname = $"{tourGuest.FirstName} {tourGuest.LastName}",
                        PhotoUrl = "/static/images/anonymous.png",
                        ProfileUrl = null,
                        ShortDescription = null
                    });
                }
            }

            return profiles;
            //return source.Value1 + source.Value2;
        }
    }

    public class TourOperatorResolver : IValueResolver<Listing, ListingResponse, ICollection<MiniProfile>>
    {
        public ICollection<MiniProfile> Resolve(Listing source, ListingResponse dest, ICollection<MiniProfile> miniProfiles, ResolutionContext context)
        {
            if (source.TourOperators == null) return null;

            var profiles = new List<MiniProfile>();

            foreach (var tourOperator in source.TourOperators)
            {
                var profile = Mapper.Map<User, MiniProfile>(tourOperator.User);
                profile.IsPrimary = tourOperator.IsPrimary;
                profiles.Add(profile);
            }

            return profiles;
        }
    }

    public class ListingSeoUrlResolver : IValueResolver<ListingView, ListingSummary, string>
    {
        public string Resolve(ListingView source, ListingSummary dest, string destMember, ResolutionContext context)
        {
            var sanitizedHeader = Regex.Replace(source.Header.ToLower(), @"[ ](?=[ ])|[^A-Za-z0-9 ]+", "").Trim();

            var url = string.Join("-", sanitizedHeader.Substring(0, Math.Min(source.Header.Length, 55)).Split(' '));

            return url;
        }
    }

    public class ArticleSeoUrlResolver : IValueResolver<Article, ArticleCard, string>
    {
        public string Resolve(Article source, ArticleCard dest, string destMember, ResolutionContext context)
        {
            var sanitizedHeader = Regex.Replace(source.Title.ToLower(), @"[ ](?=[ ])|[^A-Za-z0-9 ]+", "").Trim();

            var url = string.Join("-", sanitizedHeader.Substring(0, Math.Min(source.Title.Length, 55)).Split(' '));

            return url;
        }
    }
}
