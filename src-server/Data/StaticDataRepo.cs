using System.Globalization;
using CsvHelper;
using HydraServer.Types;

namespace HydraServer.Data;

public class StaticDataRepo
{
    private readonly List<TeamInfo> _teamInfo;

    public IEnumerable<TeamInfo> Teams => _teamInfo;

    public StaticDataRepo()
    {
        _teamInfo = LoadTeamInfo();
    }

    private static List<TeamInfo> LoadTeamInfo()
    {
        using var reader = new StreamReader("./static/ncaa_teams.csv");
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        return csv.GetRecords<TeamInfo>().ToList();
    }
}