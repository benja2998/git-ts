-- Git-ts Neoivm plugin

if vim.g.loaded_gitts == 1 then
   return
end

vim.g.loaded_gitts = 1;

local M = {}

function M.open()
   vim.cmd("terminal git-ts");
end

return M
