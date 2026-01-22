-- Git-ts Neoivm plugin

if vim.g.loaded_gitts == 1 then
   return
end

vim.g.loaded_gitts = 1;

local M = {}

function m.open()
   if vim.fn.executable("git-ts") != 0 then
	  print("No git-ts. Please install the git-ts executable!");
	  return
   end
   vim.cmd("terminal git-ts");
end

return M
