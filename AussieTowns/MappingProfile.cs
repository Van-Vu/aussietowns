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
                .ForMember(dest=>dest.UserId,opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.Fullname, opts => opts.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(src => src.PhotoUrl))
                .ForMember(dest => dest.ShortDescription, opts => opts.MapFrom(src => src.Description.PadLeft(30)));

            CreateMap<SuburbDetail, AutoCompleteItem>()
                .ForMember(dest => dest.Name,
                    opts => opts.MapFrom(src => $"{src.SuburbName}, {src.State} ({src.Postcode})"));

            CreateMap<Listing, ListingSummary>()
                .ForMember(dest => dest.Location,
                    opts => opts.MapFrom(src => $"{src.Location.SuburbName}, {src.Location.State} ({src.Location.Postcode})"))
                .ForMember(dest => dest.PrimaryOwner,
                    opts => opts.MapFrom(src => src.TourOperators.Any(x=>x.IsOwner) ? src.TourOperators.SingleOrDefault(x=>x.IsOwner).User.FirstName : string.Empty))
                .ForMember(dest => dest.MinParticipant,
                    opts => opts.MapFrom(src => src.Type==ListingType.Offer ? src.MinParticipant : src.TourGuests.Count()));
        }
    }
}
