import { Octokit } from "@octokit/rest"

export default async function getrepositorys(token: string) {

    const octokit = new Octokit({
        auth: token
    })

    const response = await octokit.request('GET /user/repos', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        },
        sort: 'created',
        visibility: 'all',
        affiliation: 'owner, collaborator, organization_member'
    })

    const repositorys = response.data.map((repository) => {
      return {
        id:repository.id.toString(),
        avatar:repository.owner.avatar_url,
        name: repository.name,
        private: repository.visibility === "private" ? true : false,
        url: repository.homepage,
        created_at: repository.created_at!
      }  
    })
    
    return repositorys
}

