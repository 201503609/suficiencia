#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/list.h>
#include <linux/types.h>
#include <linux/slab.h>
#include <linux/sched.h>
#include <linux/string.h>
#include <linux/fs.h>
#include <linux/seq_file.h>
#include <linux/proc_fs.h>
#include <linux/sched/signal.h>
#include <linux/cred.h>

#define FileProc "procsdetail_module"

char buffer[256];
char *get_task_state(long state)
{
    switch (state)
    {
    case TASK_RUNNING:
        return "TASK_RUNNING";
    case TASK_INTERRUPTIBLE:
        return "TASK_INTERRUPTIBLE";
    case TASK_UNINTERRUPTIBLE:
        return "TASK_UNINTERRUPTIBLE";
    case __TASK_STOPPED:
        return "__TASK_STOPPED";
    case EXIT_ZOMBIE:
        return "EXIT_ZOMBIE";
    default:
    {
        sprintf(buffer, "OTRO:%ld", state);
        return buffer;
    }
    }
}

static int pstree(struct seq_file *m, void *v)
{
    struct task_struct *task_list;
    seq_printf(m, "{\nbody:[");
    for_each_process(task_list)
    {
        seq_printf(m, "{\n");
        seq_printf(m, "\"proceso\": \"%s\",\n\"pid\": \"%d\",\n\"uid\":\"%d\",\n\"estado\":\"%s\"\n", task_list->comm, task_list->pid, task_list->cred->uid.val, get_task_state(task_list->state));
        seq_printf(m, "},");
    }
    seq_printf(m, "{\n");
    seq_printf(m, "\"proceso\": \"FIN\",\n\"pid\": \"FIN\",\n\"uid\":\"FIN\",\n\"estado\":\"FIN\"\n");
    seq_printf(m, "}");
    seq_printf(m, "]\n}");
    return 0;
}

static int processinfo_proc_open(struct inode *inode, struct file *file)
{
    return single_open(file, pstree, NULL);
}

static const struct file_operations procsinfo_proc_fops = {
    .open = processinfo_proc_open,
    .read = seq_read,
    .llseek = seq_lseek,
    .release = single_release,
};

static int __init start_function(void)
{
    printk(KERN_INFO "Hola mundo, este es el listado de procesos\n");
    proc_create(FileProc, 0, NULL, &procsinfo_proc_fops);
    return 0;
}

static void __exit clean_function(void)
{
    remove_proc_entry(FileProc, NULL);
    printk(KERN_INFO "Sayonara mundo, este fue el listado de procesos\n");
}

module_init(start_function);
module_exit(clean_function);
MODULE_DESCRIPTION("Listado de Procesos Diego Berrios");
MODULE_LICENSE("GPL");
