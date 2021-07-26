// SPDX-License-Identifier: GPL-2.0
#include <linux/cpumask.h>
#include <linux/fs.h>
#include <linux/init.h>
#include <linux/interrupt.h>
#include <linux/kernel_stat.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
#include <linux/sched/stat.h>
#include <linux/seq_file.h>
#include <linux/slab.h>
#include <linux/time.h>
#include <linux/irqnr.h>
#include <linux/sched/cputime.h>
#include <linux/tick.h>

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>

#ifndef arch_irq_stat_cpu
#define arch_irq_stat_cpu(cpu) 0
#endif
#ifndef arch_irq_stat
#define arch_irq_stat() 0
#endif

#ifdef arch_idle_time

static u64 get_idle_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 idle;

	idle = kcs->cpustat[CPUTIME_IDLE];
	if (cpu_online(cpu) && !nr_iowait_cpu(cpu))
		idle += arch_idle_time(cpu);
	return idle;
}

static u64 get_iowait_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 iowait;

	iowait = kcs->cpustat[CPUTIME_IOWAIT];
	if (cpu_online(cpu) && nr_iowait_cpu(cpu))
		iowait += arch_idle_time(cpu);
	return iowait;
}

#else

static u64 get_idle_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 idle, idle_usecs = -1ULL;

	if (cpu_online(cpu))
		idle_usecs = get_cpu_idle_time_us(cpu, NULL);

	if (idle_usecs == -1ULL)
		/* !NO_HZ or cpu offline so we can rely on cpustat.idle */
		idle = kcs->cpustat[CPUTIME_IDLE];
	else
		idle = idle_usecs * NSEC_PER_USEC;

	return idle;
}

static u64 get_iowait_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 iowait, iowait_usecs = -1ULL;

	if (cpu_online(cpu))
		iowait_usecs = get_cpu_iowait_time_us(cpu, NULL);

	if (iowait_usecs == -1ULL)
		/* !NO_HZ or cpu offline so we can rely on cpustat.iowait */
		iowait = kcs->cpustat[CPUTIME_IOWAIT];
	else
		iowait = iowait_usecs * NSEC_PER_USEC;

	return iowait;
}

#endif

static int show_stat(struct seq_file *p, void *v)
{
	int i, j;
	u64 user, nice, system, idle, iowait, irq, softirq, steal;
	u64 t_total, t_idle, t_usage;
	u64 guest, guest_nice;
	u64 sum = 0;
	u64 sum_softirq = 0;
	unsigned int per_softirq_sums[NR_SOFTIRQS] = {0};
	struct timespec64 boottime;

	user = nice = system = idle = iowait =
		irq = softirq = steal = 0;
	guest = guest_nice = 0;
	getboottime64(&boottime);

	for_each_possible_cpu(i)
	{
		struct kernel_cpustat *kcs = &kcpustat_cpu(i);

		user += kcs->cpustat[CPUTIME_USER];
		nice += kcs->cpustat[CPUTIME_NICE];
		system += kcs->cpustat[CPUTIME_SYSTEM];
		idle += get_idle_time(kcs, i);
		iowait += get_iowait_time(kcs, i);
		irq += kcs->cpustat[CPUTIME_IRQ];
		softirq += kcs->cpustat[CPUTIME_SOFTIRQ];
		steal += kcs->cpustat[CPUTIME_STEAL];
		guest += kcs->cpustat[CPUTIME_GUEST];
		guest_nice += kcs->cpustat[CPUTIME_GUEST_NICE];
		sum += kstat_cpu_irqs_sum(i);

		for (j = 0; j < NR_SOFTIRQS; j++)
		{
			unsigned int softirq_stat = kstat_softirqs_cpu(j, i);

			per_softirq_sums[j] += softirq_stat;
			sum_softirq += softirq_stat;
		}
	}

	//seq_printf(p, "user: %lld ", user);
	//seq_printf(p, "nice: %lld ", nice);
	//seq_printf(p, "system: %lld ", system);
	//seq_printf(p, "idle: %lld ", idle);
	//seq_printf(p, "iowait: %lld ", iowait);
	//seq_printf(p, "irq: %lld ", irq);
	//seq_printf(p, "softirq: %lld ", softirq);
	//seq_printf(p, "steal: %lld ", steal);

	t_total = user + nice + system + idle + iowait + irq + softirq + steal;
	seq_printf(p, "total: %lld\n", t_total);
	t_idle = idle + iowait;
	t_usage = t_total - t_idle;
	seq_printf(p, " usage: %lld ", t_usage);

	//total: 3873215445496
	//idle: 3813624810000%f
	//usage: 7686840255496
	//percentage: 100

	return 0;
}

static int stat_open(struct inode *inode, struct file *file)
{
	unsigned int size = 1024 + 128 * num_online_cpus();

	/* minimum size to display an interrupt count : 2 bytes */
	size += 2 * nr_irqs;
	return single_open_size(file, show_stat, NULL, size);
}

static const struct file_operations proc_stat_operations = {
	.open = stat_open,
	.read = seq_read,
	.llseek = seq_lseek,
	.release = single_release,
};

static int __init proc_stat_init(void)
{
	proc_create("CPU_201503609", 0, NULL, &proc_stat_operations);
	return 0;
}
static void __exit cleanFuncion(void)
{
	remove_proc_entry("CPU_201503609", NULL);
}

module_init(proc_stat_init);
module_exit(cleanFuncion);

MODULE_AUTHOR("Diego Josue Berrios Gutierrez");
MODULE_DESCRIPTION("Modulo para el consumo de Ram.");
MODULE_LICENSE("GPL");