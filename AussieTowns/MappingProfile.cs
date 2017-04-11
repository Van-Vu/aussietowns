using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using AutoMapper;

namespace AussieTowns
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, MiniProfile>()
                .ForMember(dest => dest.Fullname, opts => opts.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(src => "/asset/images/home-icon.png"))
                .ForMember(dest => dest.ShortDescription, opts => opts.MapFrom(src => src.Description.PadLeft(30)));

            CreateMap<SuburbDetail, AutoCompleteItem>()
                .ForMember(dest => dest.Name,
                    opts => opts.MapFrom(src => $"{src.SuburbName}, {src.State} ({src.Postcode})"));

            CreateMap<User, AutoCompleteItem>()
                .ForMember(dest => dest.Name,
                    opts => opts.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.ImageUrl, opts => opts.MapFrom(src => "/asset/images/home-icon.png"));

            CreateMap<Listing, ListingSummary>()
                .ForMember(dest => dest.Location,
                    opts => opts.MapFrom(src => $"{src.Location.SuburbName}, {src.Location.State} ({src.Location.Postcode})"))
                .ForMember(dest => dest.PrimaryOwner,
                    opts => opts.MapFrom(src => src.TourOperators.Any(x=>x.IsOwner) ? src.TourOperators.SingleOrDefault(x=>x.IsOwner).User.FirstName : string.Empty))
                .ForMember(dest => dest.MinParticipant,
                    opts => opts.MapFrom(src => src.Type==ListingType.Offer ? src.MinParticipant : src.TourGuests.Count()));

            CreateMap<Schedule, ScheduleResponse>()
                .ForMember(dest => dest.StartDate, opts => opts.MapFrom(src => src.StartDate.Date.ToString("yyyy/MM/dd")))
                .ForMember(dest => dest.StartTime, opts => opts.MapFrom(src => src.StartDate.TimeOfDay.ToString("c")))
                .ForMember(dest => dest.Duration,
                    opts => opts.MapFrom(src => src.Duration.ToString("c")))
                .ForMember(dest => dest.EndDate,
                    opts => opts.MapFrom(src => src.EndDate.HasValue ? src.EndDate.Value.Date.ToString("yyyy/MM/dd") : string.Empty));

            CreateMap<Listing, ListingResponse>()
                .ForMember(dest => dest.LocationDetail,
                    opts => opts.MapFrom(src => Mapper.Map<SuburbDetail,AutoCompleteItem>(src.Location)))
                .ForMember(dest => dest.Schedules,
                    opts => opts.MapFrom(src => src.Schedules.Select(x => Mapper.Map<Schedule, ScheduleResponse>(x))))
                .ForMember(dest => dest.TourOperators,
                    opts => opts.MapFrom(src => src.TourOperators.Select(x => Mapper.Map<User, MiniProfile>(x.User))))
                .ForMember(dest => dest.TourGuests,
                    opts => opts.MapFrom(src => src.TourGuests.Select(x => Mapper.Map<User, MiniProfile>(x.User))));
        }
    }
}
