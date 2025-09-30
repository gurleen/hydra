using CsvHelper.Configuration.Attributes;

namespace HydraServer.Types;

public readonly record struct TeamInfo
{
    [Name("team_id")]
    public required int EspnId { get; init; }
    [Name("abbreviation")]
    public required string Abbreviation { get; init; }
    [Name("display_name")]
    public required string SchoolName { get; init; }
    [Name("short_name")]
    public required string ShortName { get; init; }
    [Name("mascot")]
    public required string Mascot { get; init; }
    [Name("nickname")]
    public required string Nickname { get; init; }
    [Name("team")]
    public required string Team { get; init; }
    [Name("color")]
    public required string Color { get; init; }
    [Name("alternate_color")]
    public required string AlternateColor { get; init; }
    [Name("group_id")]
    public required int GroupId { get; init; }
    [Name("conference_short_name")]
    public required string ConferenceShortName { get; init; }
    [Name("conference_name")]
    public required string ConferenceName { get; init; }
    [Name("conference_id")]
    public required int ConferenceId { get; init; }
    [Name("logo_name")]
    public required string LogoName { get; init; }
    [Name("website")]
    public required string Website { get; init; }
}