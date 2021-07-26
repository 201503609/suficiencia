ifneq ($(KERNELRELEASE),)
obj-m  := procsdetail_module.o

else
    KDIR ?= /lib/modules/`uname -r`/build

default:
	$(MAKE) -C $(KDIR) M=$$PWD

endif