import { useMemo, useState } from 'react'

const initialProjects = [
  {
    id: crypto.randomUUID(),
    title: 'Brand Identity Refresh',
    description: 'A complete visual system for a growing creative studio.',
  },
  {
    id: crypto.randomUUID(),
    title: 'Portfolio Website',
    description: 'A responsive website designed to present case studies clearly.',
  },
  {
    id: crypto.randomUUID(),
    title: 'Product Launch Campaign',
    description: 'Digital assets and messaging for a new product release.',
  },
]

const emptyProject = {
  title: '',
  description: '',
}

function App() {
  const [projects, setProjects] = useState(initialProjects)
  const [projectDraft, setProjectDraft] = useState(emptyProject)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return projects
    }

    return projects.filter((project) =>
      `${project.title} ${project.description}`.toLowerCase().includes(query),
    )
  }, [projects, searchTerm])

  function updateProjectDraft(event) {
    const { name, value } = event.target
    setProjectDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }))
  }

  function addProject(event) {
    event.preventDefault()

    const nextProject = {
      id: crypto.randomUUID(),
      title: projectDraft.title.trim(),
      description: projectDraft.description.trim(),
    }

    if (!nextProject.title || !nextProject.description) {
      return
    }

    setProjects((currentProjects) => [...currentProjects, nextProject])
    setProjectDraft(emptyProject)
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[760px] bg-emerald-50 pb-11">
      <header className="border-b border-emerald-200 bg-white px-6 py-8 text-center sm:py-9">
        <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-emerald-300 to-purple-300"></div>
        <h1 className="text-2xl font-bold leading-tight tracking-normal text-slate-950 sm:text-3xl">
          Personal Project Showcase App
        </h1>
        <p className="mt-2 text-sm text-emerald-800/75 sm:text-[15px]">
          Organize, add, and search your featured work.
        </p>
      </header>

      <section className="mx-auto mt-7 w-[calc(100%-28px)] max-w-[680px] rounded-lg border border-emerald-200 bg-white p-5 shadow-[0_16px_36px_rgba(6,78,59,0.09)] sm:w-[calc(100%-36px)] sm:p-6">
        <div className="mb-5">
          <h2 className="text-2xl font-bold leading-tight text-slate-950">Add Project</h2>
          <p className="mt-1 text-sm text-emerald-800/70">Create a new portfolio entry.</p>
        </div>

        <form className="grid gap-3" onSubmit={addProject}>
          <label className="text-sm font-bold text-slate-700" htmlFor="project-title">
            Title
          </label>
          <input
            className="h-11 w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
            id="project-title"
            name="title"
            type="text"
            placeholder="e.g. Website Redesign"
            value={projectDraft.title}
            onChange={updateProjectDraft}
            required
          />

          <label className="text-sm font-bold text-slate-700" htmlFor="project-description">
            Description
          </label>
          <textarea
            className="min-h-24 w-full resize-y rounded-md border border-emerald-200 bg-white px-3 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
            id="project-description"
            name="description"
            placeholder="Briefly describe the project outcome."
            value={projectDraft.description}
            onChange={updateProjectDraft}
            required
          />

          <button
            className="mt-1 h-11 w-full rounded-md bg-emerald-600 px-5 font-bold text-white transition hover:-translate-y-px hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-purple-400/30 sm:w-28"
            type="submit"
          >
            Add
          </button>
        </form>
      </section>

      <section
        className="mx-auto mt-7 w-[calc(100%-28px)] max-w-[680px] overflow-hidden rounded-lg border border-emerald-200 bg-white shadow-[0_16px_36px_rgba(6,78,59,0.09)] sm:w-[calc(100%-36px)]"
        aria-label="Project list"
      >
        <div className="grid gap-2 border-b border-emerald-200 bg-emerald-50/70 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
          <input
            className="h-10 w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
            type="search"
            placeholder="Search Projects"
            aria-label="Search Projects"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <span className="whitespace-nowrap text-sm font-bold text-purple-700">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <div className="px-4 py-2">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article
                className="grid grid-cols-[56px_1fr] items-center gap-3 border-b border-emerald-100 py-4 last:border-b-0 sm:grid-cols-[64px_1fr] sm:gap-4"
                key={project.id}
              >
                <div
                  className="grid size-14 place-items-center rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-100 to-purple-100 text-2xl font-extrabold text-emerald-800 sm:size-16"
                  aria-hidden="true"
                >
                  {project.title.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight text-slate-950">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="py-7 text-center text-slate-500">No projects found.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
