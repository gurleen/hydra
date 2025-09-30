using HydraServer.Data;
using HydraServer.Types;
using Microsoft.AspNetCore.Mvc;

namespace HydraServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamController(StaticDataRepo repo) : ControllerBase
{
    [HttpGet]
    public IEnumerable<TeamInfo> GetTeams() => repo.Teams;

    [HttpGet("{id}")]
    public TeamInfo GetTeamById(int id) => repo.Teams.First(x => x.EspnId == id);
}